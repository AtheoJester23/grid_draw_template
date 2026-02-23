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
    delete: boolean,
    targetDelete: number | null,
    grayscale: boolean,
    border: boolean
}

const initialState: stateType = {
    files: [],
    newFile: false,
    download: false,
    delete: false,
    targetDelete: null,
    grayscale: false,
    border: false
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
        setDelete(state, action){
            state.delete = action.payload
        },
        setDeleteTarget(state, action){
            state.targetDelete = action.payload
        },
        setGraycale(state, action){
            state.grayscale = action.payload
        },
        setBorder(state, action){
            state.border = action.payload;
        }
    }
})

export const { setFiles, setNewFile, setDownload, setDelete, setDeleteTarget, setGraycale, setBorder } = FileSlice.actions;
export default FileSlice.reducer;