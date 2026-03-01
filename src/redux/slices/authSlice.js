import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null, // Login hone par user data yahan aayega
        loading: false, // API calls ke waqt loading handle karne ke liye
    },
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
        updateUser:(state,action)=>{
            state.user =action.payload
        },
        logoutUser: (state) => {
            state.user = null;
        }
    }
});

export const { setLoading, setUser, logoutUser,updateUser } = authSlice.actions;
export default authSlice.reducer;