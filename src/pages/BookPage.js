import Header from "components/Header/Header";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setLoading } from "../store/slices/booksSlice";

export default function BookPage() {
  const { id } = useParams();
  const [book, setBook] = useState({});
  const [loading, setLoad] = useState(false);
  const dispatch = useDispatch();

  async function handleBook(book) {
    setLoad(false);
    const { data } = await axios
      .get(
        `https://www.googleapis.com/books/v1/volumes/${book}?key=AIzaSyDXo-Zc1iqdSXL6Pw0RkU7dqwnCpdSqM9Y`
      )
      .catch(err => console.log(err))
      .finally(() => setLoad(true));
    setBook(data);
  }

  useEffect(() => {
    handleBook(id);
    dispatch(setLoading(true));
  }, []);

  return (
    <>
      <Header />

      {loading ? (
        <>
          <Link to="/">
            <p className="mt-1 text-3xl max-w-[1600px] mx-auto">Go back</p>
          </Link>
          <div className="flex max-w-[1600px] m-auto mt-14 justify-start">
            {book.volumeInfo?.imageLinks && (
              <img
                className="w-full"
                src={book.volumeInfo.imageLinks?.thumbnail}
                alt={book.volumeInfo.title}
              />
            )}
            <div className="ml-8">
              <h2 className="font-bold text-2xl">{book?.volumeInfo?.title}</h2>
              <p className="font-semibold my-3">
                Categories: {book?.volumeInfo?.categories}
              </p>
              <p className="font-semibold">
                Author: {book?.volumeInfo?.authors}
              </p>
              <p className="mt-3 border-4 p-3 h-52 overflow-y-scroll">
                {book?.volumeInfo?.description}
              </p>
            </div>
          </div>
        </>
      ) : (
        "Loading..."
      )}
    </>
  );
}
