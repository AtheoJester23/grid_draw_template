import { createSlice } from "@reduxjs/toolkit";

type filesType = {
    name: null | string,
    size: null | string,
    border: boolean
}

type stateType = {
    files: filesType[]
}

const initialState: stateType = {
    files: []
}

const FileSlice = createSlice({
    name: "FileSlice",
    initialState,
    reducers: {
        setFiles(state, action){
            state.files = action.payload
        }
    }
})

export const { setFiles } = FileSlice.actions;
export default FileSlice.reducer;