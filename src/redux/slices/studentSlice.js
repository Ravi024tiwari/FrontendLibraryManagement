import { createSlice } from "@reduxjs/toolkit";

const studentSlice = createSlice({
    name: "student",
    initialState: {
        stats: {
            totalLifetimeIssued: 0,
            currentlyIssued: 0,
            totalFine: 0
        },
        chartData: [],
        currentIssuedBooks: [], // Array for the table
        previousIssuedBooks:[],
        loading: false,
    },
    reducers: {
        setStudentDashboardData: (state, action) => {
            state.stats = action.payload.stats;
            state.chartData = action.payload.chartData;
        },
        setStudentLoading: (state, action) => {
            state.loading = action.payload;
        },
        setCurrentIssuedBooks: (state, action) => {
            state.currentIssuedBooks = action.payload;
        },
        setPreviousIssuedBooks:(state,action)=>{ //here we get the pre return books of the logged in student
            state.previousIssuedBooks =action.payload
        },
        clearStudentData: (state) => {
            state.stats = { totalLifetimeIssued: 0, currentlyIssued: 0, totalFine: 0 };
            state.chartData = [];
            state.currentIssuedBooks = [];
        }
    }
});

export const { 
    setStudentDashboardData, 
    setStudentLoading, 
    clearStudentData, 
    setCurrentIssuedBooks ,
    setPreviousIssuedBooks
} = studentSlice.actions;
export default studentSlice.reducer;