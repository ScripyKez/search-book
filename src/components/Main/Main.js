import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadBook, nextPage } from "store/slices/booksSlice";
import CardBook from "components/CardBook/CardBook";
import axios from "axios";
import cx from "clsx";

export default function Main() {
  const dispatch = useDispatch();

  const {  value, page, search, sortBy,  counter } =
    useSelector(state => state.books);

  const [isLoading, setIsLoading] = useState(false);

  async function loadMore() {
    setIsLoading(true);
    const { data } = await axios
      .get(
        `https://www.googleapis.com/books/v1/volumes?q=${search}&key=AIzaSyDXo-Zc1iqdSXL6Pw0RkU7dqwnCpdSqM9Y&maxResults=30&startIndex=${
          page + 30
        }&orderBy=${sortBy}`
      )
      .catch(err => console.log(err.message))
      .finally(() => setIsLoading(false));
    dispatch(loadBook(data.items));
  }

  return (
    <main className="max-w-[1600px] m-auto my-3">
      {value?.length > 0 && (
        <h2 className="text-center my-4 text-xl font-medium">
          <span className="italic">{counter}</span> results for{" "}
          <span>"{search}"</span>
        </h2>
      )}
      <div className="flex flex-wrap justify-center align-middle">
        {value ? (
          value?.map((book, i) => (
            <CardBook
              id={book.id}
              key={book.id + i}
              category={book.volumeInfo.categories}
              title={book.volumeInfo.title}
              img={book.volumeInfo.imageLinks?.thumbnail}
              authors={book.volumeInfo.authors}
            />
          ))
        ) : (
          <h3 className="mb-4 text-2xl font-bold text-slate-500">
            Nothing was found :(
          </h3>
        )}
      </div>

      <button
        onClick={e => {
          e.preventDefault();
          dispatch(nextPage());
        }}
        className={cx(
          "w-full text-xl text-white font-semibold rounded-xl py-1 bg-sky-300 hover:bg-sky-400",
          {
            "bg-red-800 hover:cursor-wait hover:bg-red-700": isLoading,
            "hidden invisible": value?.length === 0,
          }
        )}
      >
        Load More
      </button>
    </main>
  );
}
