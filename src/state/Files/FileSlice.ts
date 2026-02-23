import { createSlice } from "@reduxjs/toolkit";

type filesType = {
    name: null | string,
    size: null | string,
    border: boolean,
}

type stateType = {
    files: filesType[],
    download: boolean
}

const initialState: stateType = {
    files: [],
    download: false
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
        }
    }
})

export const { setFiles, setDownload } = FileSlice.actions;
export default FileSlice.reducer;