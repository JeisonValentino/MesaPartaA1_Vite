import { create } from "zustand";



const useStoreDialog = create((set) => ({
    visible: false,
    header:"",
    tipo_componente:"",
    cuerpo:{},
    setVisible: (visible) =>set({visible}), 
    setHeader:(header)=>set({header}),
    setTipo_componente:(tipo_componente)=>set({tipo_componente}),
    setCuerpo:(cuerpo)=>set({cuerpo})
  }));
  
  export default useStoreDialog;