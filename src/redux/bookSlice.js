import { createSlice } from "@reduxjs/toolkit";

const bookSlice = createSlice({
    name: "books",
    initialState: {
        books: []
    },
    reducers: {
        addBook: (state, action) => {
            // Assuming book has an id field
            state.books.push(action.payload);
        },
        deleteBook: (state, action) => {
            state.books = state.books.filter(book => book.id !== action.payload);
        },
        editBook: (state, action) => {
            const { id, Title, author, year, image } = action.payload;
            const existingBook = state.books.find(book => book.id === id);
            if (existingBook) {
                existingBook.Title = Title;
                existingBook.author = author;
                existingBook.year = year;
                existingBook.image = image;
            }
        }
    }
});

export const { addBook, deleteBook, editBook } = bookSlice.actions;
export default bookSlice.reducer;
