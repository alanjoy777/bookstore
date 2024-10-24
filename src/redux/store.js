import { configureStore } from "@reduxjs/toolkit";
import bookSlice from './bookSlice'


const store= configureStore({
    reducer:{
      bookReducer:bookSlice
    }
})

export default store