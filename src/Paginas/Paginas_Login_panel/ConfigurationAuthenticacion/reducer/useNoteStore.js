import { create } from "zustand";
import { crearNotas, obtenerNotas } from "../../../Paginas_Presentacion/Complemets/Rutas/notas_axios";

const useNoteStore = create((set) => ({
    notes: [],
    loading: false,
    error: null,
    initNote: async () => {
      set({ loading: true });
  
      try {
        const notes = await obtenerNotas();
        set({ notes, loading: false });
      } catch (error) {
        set({ error: error.message, loading: false });
      }
    },
    createNote: async (content) => {
      set({ loading: true });
  
      try {
        const newNote = await crearNotas(content);
        set((state) => ({ notes: [...state.notes, newNote], loading: false }));
      } catch (error) {
        set({ error: error.message, loading: false });
      }
    },
  }));

  export default useNoteStore;
  export const initNote = () => useNoteStore.getState().initNote;
