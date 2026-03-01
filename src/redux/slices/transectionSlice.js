import { createSlice } from "@reduxjs/toolkit";

const transactionSlice = createSlice({
    name: "transaction",
    initialState: {
        history: [], // Transaction list
        loading: false,
        pagination: {
            totalTransactions: 0,
            totalPages: 1,
            currentPage: 1,
            pageSize: 10
        }
    },
    reducers: {
        // 1. Puri history ek saath set karne ke liye
        setHistory: (state, action) => {
            state.history = action.payload;
        },

        // 2. Loading state toggle karne ke liye
        setLoading: (state, action) => {
            state.loading = action.payload;
        },

        // 3. Backend se aayi pagination meta set karne ke liye
        setPagination: (state, action) => {
            state.pagination = {
                ...state.pagination,
                ...action.payload
            };
        },

        // 4. Sirf current page badalne ke liye (UI buttons ke liye)
        setCurrentPage: (state, action) => {
            state.pagination.currentPage = action.payload;
        },

        // 5. Optimistic UI: Jab admin return process kare
        updateTransactionStatus: (state, action) => {
            const { transactionId, status, lateFine, fineStatus, returnDate } = action.payload;
            const index = state.history.findIndex(t => t._id === transactionId);
            if (index !== -1) {
                state.history[index] = {
                    ...state.history[index],
                    status,
                    lateFine,
                    fineStatus,
                    returnDate
                };
            }
        },

        // 6. Logout ya component unmount par data saaf karne ke liye
        clearHistory: (state) => {
            state.history = [];
            state.pagination = { totalTransactions: 0, totalPages: 1, currentPage: 1, pageSize: 10 };
        }
    }
});

export const { 
    setHistory, 
    setLoading, 
    setPagination, 
    setCurrentPage, 
    updateTransactionStatus,
    clearHistory 
} = transactionSlice.actions;

export default transactionSlice.reducer;