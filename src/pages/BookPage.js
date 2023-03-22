import Header from "components/Header/Header";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
//https://www.googleapis.com/books/v1/volumes/zyTCAlFPjgYC?key=yourAPIKey
export default function BookPage() {
  const { id } = useParams();
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  async function handleBook(book) {
    setLoading(false);
    const { data } = await axios
      .get(
        `https://www.googleapis.com/books/v1/volumes/${book}?key=AIzaSyDXo-Zc1iqdSXL6Pw0RkU7dqwnCpdSqM9Y`
      )
      .catch(err => console.log(err))
      .finally(() => setLoading(true));
    //  console.log("====================================");
    //  console.log(data);
    //  console.log("====================================");
    setBook(data);
  }

  useEffect(() => {
    handleBook(id);
  }, []);

  return (
    <>
      <Header />
      <Link to="/">
        <p className="text-3xl">to back</p>
      </Link>
      {loading ? (
        <div>
          <h2>{book?.volumeInfo?.title}</h2>
          <p>{book.volumeInfo.categories}</p>

          <img
            src={book.volumeInfo.imageLinks?.thumbnail}
            alt={book.volumeInfo.title}
          />
          <p>{book.volumeInfo.description}</p>
          <p className="font-bold">{book.volumeInfo.authors}</p>
        </div>
      ) : (
        "Loading..."
      )}
    </>
  );
}
