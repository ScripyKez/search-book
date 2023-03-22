import { useDispatch, useSelector } from "react-redux";
import { useRef, useEffect } from "react";
import {
  setFilter,
  setBooks,
  setCategory,
  setSearch,
  setSortBy,
  setCounter,
} from "store/slices/booksSlice";
import axios from "axios";

import { BsSearch } from "react-icons/bs";

//apikey- AIzaSyDXo-Zc1iqdSXL6Pw0RkU7dqwnCpdSqM9Y
// https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor:keyes&key=yourAPIKey

export default function Header() {
  const dispatch = useDispatch();
  const { page, search, value, sortBy } = useSelector(state => state.books);

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

  useEffect(() => {
    if (search) {
      handleSearch(search);
    }
  }, [sortBy]);

  function filter(category) {
    if (category === "ALL") {
      dispatch(setBooks(value));
    } else if (category === "Art") {
      dispatch(
        setFilter(value.filter(book => book.volumeInfo.categories == "Art"))
      );
    } else if (category === "Biography") {
      dispatch(
        setFilter(
          value.filter(book => book.volumeInfo.categories == "Biography")
        )
      );
    } else if (category === "Computers") {
      dispatch(
        setFilter(
          value.filter(book => book.volumeInfo.categories == "Computers")
        )
      );
    } else if (category === "History") {
      dispatch(
        setFilter(value.filter(book => book.volumeInfo.categories == "History"))
      );
    } else if (category === "Medical") {
      dispatch(
        setFilter(
          value.filter(book => book.volumeInfo.categories == "Medicine")
        )
      );
    } else if (category === "Poetry") {
      dispatch(
        setFilter(value.filter(book => book.volumeInfo.categories == "Poetry"))
      );
    }
  }

  return (
    <header className="w-full bg-slate-200 justify-center flex flex-col py-10">
      <h1 className="m-auto font-bold text-3xl">Search for books</h1>
      <div className="m-auto flex bg-white p-2 rounded-lg mt-6 w-[50%]">
        <input
          ref={ref}
          className="p-2 outline-none w-full"
          type="text"
          placeholder="Search for books"
          onKeyDown={e => {
            if (e.key === "Enter") {
              e.preventDefault();
              dispatch(setSearch(e.target.value));
              handleSearch(e.target.value);
            }
          }}
        />
        <button
          className="pr-2"
          onClick={e => {
            e.preventDefault();
            dispatch(setSearch(ref.current.value));
            handleSearch(ref.current.value);
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
            filter(ref3.current.value);
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
