import { createSlice } from "@reduxjs/toolkit";

type filesType = {
    id: string,
    name: null | string,
    size: null | string,
    border: "noBorder" | "halfCm" | "oneCm" | "halfInch" | "oneInch",
    grid: "noGrid" | 'oneInchGrid' | 'twoInchGrid' | 'threeInchGrid' | 'fourInchGrid',
    bnw: boolean,
    pic: string,
    picState: {
        x: number,
        y: number,
        width: number,
        height: number,
    }
    orientation: 'portrait' | 'landscape'
}

type stateType = {
    files: filesType[],
    newFile: boolean,
    download: boolean,
    delete: boolean,
    targetDelete: number | null,
    currentTab: number | null,
    grayscale: boolean,
}

const initialState: stateType = {
    files: [],
    newFile: false,
    download: false,
    delete: false,
    targetDelete: null,
    currentTab: null,
    grayscale: false,
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
        setCurrentTab(state, action){
            state.currentTab = action.payload
        },
        setGraycale(state, action){
            state.grayscale = action.payload
        },
    }
})

export const { setFiles, setNewFile, setDownload, setDelete, setDeleteTarget, setCurrentTab, setGraycale } = FileSlice.actions;
export default FileSlice.reducer;