import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import auth from "./auth";
import modal from "./modal";
import filter from "./filter";
import editExpenseSubCategory from "./editExpenseSubCategory";
import date from "./date";


const store = configureStore({
    reducer: {
        auth,
        modal,
        editExpenseSubCategory,
        date,
        filter,
    },
    middleware: [
        ...getDefaultMiddleware({
            serializableCheck: false,
        }),
      ]
})

export default store;