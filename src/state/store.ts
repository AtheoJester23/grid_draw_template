import { configureStore } from "@reduxjs/toolkit";
import filesReducer from './Files/FileSlice'

const store = configureStore({
    reducer: {
        fileHolder: filesReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;