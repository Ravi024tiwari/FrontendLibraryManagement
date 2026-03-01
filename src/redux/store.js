import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice.js";
import adminSlice from "./slices/adminSlice.js"
import bookSlice from "./slices/bookSlice.js"
import trasactionSlice from "./slices/transectionSlice.js"
import studentSlice from "./slices/studentSlice.js"

const store = configureStore({
    reducer: {
        auth: authSlice,
        admin:adminSlice,
        book:bookSlice,
        transaction:trasactionSlice,
        student:studentSlice

    },
});

export default store;