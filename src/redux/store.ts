import {configureStore} from "@reduxjs/toolkit";
import HomeSlice from "./home/slice";


export const store = configureStore({
    reducer: {
        home: HomeSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => [...getDefaultMiddleware()] as const,
    devTools:true
})

export type StoreType = ReturnType<typeof store.getState>