import { createSlice } from "@reduxjs/toolkit";

type initial = {
    zoom: number,
    frame: {
        x: number,
        y: number
    }
}

const initialState: initial = {
    zoom: 1,
    frame: {
        x: 0,
        y: 0
    }
}

const EditSlice = createSlice({
    name: "EditSlice",
    initialState,
    reducers: {
        setZoom(state, action){
            state.zoom = action.payload
        },
        setFrame(state, action){
            state.frame = action.payload
        }
    }
})

export const { setZoom, setFrame } = EditSlice.actions;
export default EditSlice.reducer;