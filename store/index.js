import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import auth from "./auth";
import modal from "./modal";
import editExpenseSubCategory from "./editExpenseSubCategory";
import date from "./date";


const store = configureStore({
    reducer: {
        auth,
        modal,
        editExpenseSubCategory,
        date,
    },
    middleware: [
        ...getDefaultMiddleware({
            serializableCheck: false,
        }),
      ]
})

export default store;