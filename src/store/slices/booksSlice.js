import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
  page: 0,
  search: "",
  sortBy: "relevance",
  category: "All",
  filter: [],
  counter: 0,
};

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    setBooks(state, actions) {
      state.value = actions.payload;
    },
    loadBook(state, action) {
      state.value.push(...action.payload);
    },
    setSearch(state, action) {
      state.search = action.payload;
    },
    clearBooks(state) {
      state.value = null;
    },
    setSortBy(state, action) {
      state.sortBy = action.payload;
    },
    setCategory(state, action) {
      state.category = action.payload;
    },
    setFilter(state, actions) {
      state.filter = actions.payload;
    },
    setCounter(state, actions) {
      state.counter = actions.payload;
    },
  },
});

export const {
  setBooks,
  loadBook,
  setSearch,
  clearBooks,
  setSortBy,
  setCategory,
  setFilter,
  setCounter,
} = booksSlice.actions;
export default booksSlice.reducer;
