import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
    name: "admin",
    initialState: {
        stats: null,        // Dashboard metrics (Total books, issues, etc.)
        loading: false,     // Global loading state for admin actions
        
        // --- STUDENT MANAGEMENT STATE ---
        students: [],       // List of students for the table
        pagination: {       // Pagination metadata from backend
            totalStudents: 0,
            totalPages: 1,
            currentPage: 1,
        }
    },
    reducers: {
        // Dashboard stats update
        setAdminStats: (state, action) => {
            state.stats = action.payload;
        },
        
        // Manual loading toggle
        setAdminLoading: (state, action) => {
            state.loading = action.payload;
        },

        
        // Students list update
        setStudents: (state, action) => {
            state.students = action.payload;
        },

        // Pagination update (total pages, current page etc.)
        setPagination: (state, action) => {
            state.pagination = action.payload;
        },

        // Optimistic UI: Student delete karne ke baad list update karein
        removeStudentFromStore: (state, action) => {
            state.students = state.students.filter(student => student._id !== action.payload);
            state.pagination.totalStudents -= 1;
        },

        // Data clear (Logout ya cleanup ke liye)
        clearAdminStats: (state) => {
            state.stats = null;
            state.students = [];
            state.pagination = { totalStudents: 0, totalPages: 1, currentPage: 1 };
        }
    }
});

export const { 
    setAdminStats, 
    setAdminLoading, 
    clearAdminStats, 
    setStudents, 
    setPagination, 
    removeStudentFromStore 
} = adminSlice.actions;

export default adminSlice.reducer;