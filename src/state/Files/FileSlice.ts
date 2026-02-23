import { createSlice } from "@reduxjs/toolkit";

type filesType = {
    name: null | string,
    size: null | string,
    border: boolean,
}

type stateType = {
    files: filesType[],
    newFile: boolean,
    download: boolean,
    grayscale: boolean,
}

const initialState: stateType = {
    files: [],
    newFile: false,
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
        setNewFile(state, action){
            state.newFile = action.payload;
        },
        setDownload(state, action){
            state.download = action.payload
        },
        setGraycale(state, action){
            state.grayscale = action.payload
        }
    }
})

export const { setFiles, setNewFile, setDownload, setGraycale } = FileSlice.actions;
export default FileSlice.reducer;