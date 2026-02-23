import { configureStore } from "@reduxjs/toolkit";
import filesReducer from './Files/FileSlice'
import editReducer from './EditConfig/EditSlice'

const store = configureStore({
    reducer: {
        fileHolder: filesReducer,
        editFile: editReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;