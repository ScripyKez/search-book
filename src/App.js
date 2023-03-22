import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "pages/HomePage";
import BookPage from "pages/BookPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/:id" element={<BookPage />} />

      {/* <h1>Search for books</h1>
        <Search />
        <Sorting />
      </Header>
      <Main>
        <Counter />
        <Books />
      </Main>
      <Book /> */}
    </Routes>
  );
}

export default App;
