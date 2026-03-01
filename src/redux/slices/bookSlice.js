import { createSlice } from "@reduxjs/toolkit";

const bookSlice = createSlice({
    name: "book",
    initialState: {
        allBooks: [],      
        singleBook: null,
        loading: false, 
        searchQuery: "", 
    },
    reducers: {

        setAllBooks: (state, action) => {
            state.allBooks = action.payload;
        },

        setSingleBook: (state, action) => {
            state.singleBook = action.payload;
        },

        addBookToStore: (state, action) => {
            state.allBooks.push(action.payload);
        },

        removeBookFromStore: (state, action) => {
            state.allBooks = state.allBooks.filter(book => book._id !== action.payload);
        },

        setBookLoading: (state, action) => {
            state.loading = action.payload;
        },

        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
        },
        updateBookInStore: (state, action) => {
       const index = state.allBooks.findIndex(book => book._id === action.payload._id);
       if (index !== -1) {
        state.allBooks[index] = action.payload; // Purani book ko nayi book se swap kar diya
     }
},
    }
});

export const { 
    setAllBooks, 
    setSingleBook, 
    addBookToStore, 
    removeBookFromStore, 
    setBookLoading, 
    setSearchQuery ,
    updateBookInStore
    
} = bookSlice.actions;

export default bookSlice.reducer;