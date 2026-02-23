import { createSlice } from "@reduxjs/toolkit";

type initial = {
    zoom: number
}

const initialState: initial = {
    zoom: 1
}

const EditSlice = createSlice({
    name: "EditSlice",
    initialState,
    reducers: {
        setZoom(state, action){
            state.zoom = action.payload
        }
    }
})

export const { setZoom } = EditSlice.actions;
export default EditSlice.reducer;