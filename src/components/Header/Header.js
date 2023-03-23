import { useDispatch, useSelector } from "react-redux";
import { useRef, useEffect } from "react";
import {
  setBooks,
  setCategory,
  setSearch,
  setSortBy,
  setCounter,
  loadBook,
  setLoading,
} from "store/slices/booksSlice";
import axios from "axios";
import cx from "clsx";

import { BsSearch } from "react-icons/bs";

//apikey- AIzaSyDXo-Zc1iqdSXL6Pw0RkU7dqwnCpdSqM9Y
// https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor:keyes&key=yourAPIKey

export default function Header() {
  const dispatch = useDispatch();
  const { page, search, value, sortBy, category, loading } = useSelector(
    state => state.books
  );

  const ref = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);

  const handleSearch = async value => {
    const { data } = await axios
      .get(
        `https://www.googleapis.com/books/v1/volumes?q=${value}&key=AIzaSyDXo-Zc1iqdSXL6Pw0RkU7dqwnCpdSqM9Y&maxResults=30&startIndex=${page}&orderBy=${sortBy}`
      )
      .catch(err => console.log(err));
    dispatch(setCounter(data.totalItems));
    dispatch(setBooks(data.items));
  };

  const handleCat = async cat => {
    if (cat === "All") {
      const { data } = await axios
        .get(
          `https://www.googleapis.com/books/v1/volumes?q=${search}&key=AIzaSyDXo-Zc1iqdSXL6Pw0RkU7dqwnCpdSqM9Y&maxResults=30&startIndex=${page}&orderBy=${sortBy}`
        )
        .catch(err => console.log(err));
      dispatch(setCounter(data.totalItems));
      dispatch(setBooks(data.items));
      dispatch(setLoading(true));
      return;
    }
    const { data } = await axios
      .get(
        `https://www.googleapis.com/books/v1/volumes?q=${search}+subject:${cat}&key=AIzaSyDXo-Zc1iqdSXL6Pw0RkU7dqwnCpdSqM9Y&maxResults=30&startIndex=${page}&orderBy=${sortBy}`
      )
      .catch(err => console.log(err));
    dispatch(setCounter(data.totalItems));
    dispatch(setBooks(data.items));
    dispatch(setLoading(true));
  };

  const nextBooks = async cat => {
    if (cat === "All") {
      const { data } = await axios
        .get(
          `https://www.googleapis.com/books/v1/volumes?q=${search}&key=AIzaSyDXo-Zc1iqdSXL6Pw0RkU7dqwnCpdSqM9Y&maxResults=30&startIndex=${page}&orderBy=${sortBy}`
        )
        .catch(err => console.log(err));
      dispatch(setCounter(data.totalItems));
      dispatch(loadBook(data.items));
      return data.items;
    }
    const { data } = await axios
      .get(
        `https://www.googleapis.com/books/v1/volumes?q=${search}+subject:${cat}&key=AIzaSyDXo-Zc1iqdSXL6Pw0RkU7dqwnCpdSqM9Y&maxResults=30&startIndex=${page}&orderBy=${sortBy}`
      )
      .catch(err => console.log(err));
    dispatch(setCounter(data.totalItems));
    dispatch(loadBook(data.items));
    return data.items;
  };

  useEffect(() => {
    if (search) {
      handleCat(category);
    }
  }, [category, sortBy, search]);

  useEffect(() => {
    if (search) {
      nextBooks(category);
    }
  }, [page]);

  return (
    <header
      className={cx(
        ` transition-[height] ease-in-out duration-800 transform ${
          loading ? "h-[300px]" : "h-[100vh]"
        } w-full bg-slate-200 justify-center flex flex-col py-10`
      )}
    >
      <h1 className="mt-auto mx-auto font-bold text-3xl">Search for books</h1>
      <div className="my-2 mx-auto flex bg-white rounded-lg mt-6 w-[50%] relative">
        <input
          ref={ref}
          className="transition-all ease-in-out duration-200 border-2 p-4 rounded-lg outline-none w-full focus:border-blue-500 focus:border-2 "
          type="text"
          placeholder="Search for books"
          onKeyDown={e => {
            if (e.key === "Enter") {
              e.preventDefault();
              dispatch(setSearch(e.target.value));
            }
          }}
        />
        <button
          className="absolute right-0 top-0 h-[100%] w-[50px] border-l-slate-200 border-l-2 pl-3"
          onClick={e => {
            e.preventDefault();
            dispatch(setSearch(ref.current.value));
          }}
        >
          <BsSearch size={22} />
        </button>
      </div>

      <div className="m-auto mt-8 max-w-full grid grid-cols-2 gap-6">
        <label className="text-xl font-medium mt-1">Category</label>
        <select
          onChange={() => {
            dispatch(setCategory(ref3.current.value));
          }}
          className="rounded-lg outline-none p-2"
          ref={ref3}
        >
          <option value="All">All</option>
          <option value="Art">Art</option>
          <option value="Biography">Biography</option>
          <option value="Computers">Computers</option>
          <option value="History">History</option>
          <option value="Medical">Medical</option>
          <option value="Poetry">Poetry</option>
        </select>
        <label className="text-xl font-medium mt-1">Sorted by</label>
        <select
          onChange={() => {
            dispatch(setSortBy(ref2.current.value));
          }}
          className="outline-none rounded-lg p-2"
          ref={ref2}
        >
          <option value="relevance">Relevance</option>
          <option value="newest">Newest</option>
        </select>
      </div>
    </header>
  );
}
