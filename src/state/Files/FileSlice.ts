import { createSlice } from "@reduxjs/toolkit";

type filesType = {
    name: null | string,
    size: null | string,
    border: boolean,
}

type stateType = {
    files: filesType[],
    download: boolean,
    grayscale: boolean,
}

const initialState: stateType = {
    files: [],
    download: false,
    grayscale: false
}

const FileSlice = createSlice({
    name: "FileSlice",
    initialState,
    reducers: {
        setFiles(state, action){
            state.files = action.payload
        },
        setDownload(state, action){
            state.download = action.payload
        },
        setGraycale(state, action){
            state.grayscale = action.payload
        }
    }
})

export const { setFiles, setDownload, setGraycale } = FileSlice.actions;
export default FileSlice.reducer;