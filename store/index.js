import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import auth from "./auth";


const store = configureStore({
    reducer: {
        auth
    },
    middleware: [
        ...getDefaultMiddleware({
            serializableCheck: false,
        }),
      ]
})

export default store;