import { createSlice } from "@reduxjs/toolkit"


const initialState2={
    severity:"",
    summary:"",
    detail:"",
    life:"",
    onclick:false,
}

export const toastSlice  =createSlice({

  
    name: 'toast',
    initialState:initialState2,
    reducers: {
      changeToast: (state, action) => {
        const { severity, summary, detail, life ,onclick} = action.payload;
        state.severity = severity;
        state.summary = summary;
        state.detail = detail;
        state.life = life;
        state.onclick=onclick;
      }
    }

})

export const { changeToast } = toastSlice.actions;
export const toastReducer = toastSlice.reducer;