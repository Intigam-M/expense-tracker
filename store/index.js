import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import auth from "./auth";
import modal from "./modal";
import editExpenseSubCategory from "./editExpenseSubCategory";


const store = configureStore({
    reducer: {
        auth,
        modal,
        editExpenseSubCategory
    },
    middleware: [
        ...getDefaultMiddleware({
            serializableCheck: false,
        }),
      ]
})

export default store;