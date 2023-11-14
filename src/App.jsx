import data from "../books.json";
import Header from "./components/Header";
import BookList from "./components/BookList";
import { useEffect, useState } from "react";

function App() {
  const [availableBooks, setAvailableBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [favBooks, setFavBooks] = useState([]);
  const [favFilteredBooks, setFavFilteredBooks] = useState([]);
  const [genres, setGenres] = useState([]);
  const [genre, setGenre] = useState("All");
  const [pages, setPages] = useState(1000);
  const [tab, setTab] = useState(0);

  useEffect(() => {
    loadLocalJson("../books.json").then((res) => {
      setAvailableBooks(res.library);
      setFilteredBooks(res.library);
      setFilters(res.library);
    });
  }, []);

  useEffect(() => {}, [filteredBooks]);

  function loadLocalJson(path) {
    return fetch(path)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok :(");
        }
        return response.json();
      })
      .catch((err) => console.log("Error", err));
  }

  const setFilters = (data) => {
    const filterSet = new Set();
    data.map((el) => {
      const book = el.book;
      filterSet.add(book.genre);
    });
    setGenres(["All", ...filterSet]);
  };

  const handleFilter = (filter = genre) => {
    setGenre(filter);
  };

  useEffect(() => {
    setFilteredBooks([
      ...availableBooks.filter((el) => {
        const book = el.book;
        if (genre == "All" && book.pages < pages) return book;
        if (book.genre == genre && book.pages < pages) return book;
      }),
    ]);

    setFavFilteredBooks([
      ...favBooks.filter((el) => {
        const book = el.book;
        if (genre == "All" && book.pages < pages) return book;
        if (book.genre == genre && book.pages < pages) return book;
      }),
    ]);
  }, [genre, pages, favBooks]);

  const handlePages = (pagesInput) => {
    setPages(pagesInput);
    // setFilteredBooks([
    //   ...availableBooks.filter((el) => {
    //     const book = el.book;
    //     if (genre == "All" && book.pages < pages) {
    //       return book;
    //     }
    //     if (book.genre == genre && book.pages < pages) return book;
    //   }),
    // ]);
    handleFilter();
  };

  const handleFav = (id) => {
    if (tab == 1) {
      const bookFav = favBooks.filter((el) => {
        const book = el.book;
        if (book.ISBN == id) {
          return book;
        }
      });

      setFavBooks((prevBooks) => {
        return prevBooks.filter((el) => el.book["ISBN"] !== id);
      });
      console.log(bookFav);
      setAvailableBooks([...availableBooks, ...bookFav]);
      setFilteredBooks([...filteredBooks, ...bookFav]);
    }

    if (tab == 0) {
      const bookFav = availableBooks.filter((el) => {
        const book = el.book;
        if (book.ISBN == id) {
          return book;
        }
      });

      setFavBooks([...favBooks, ...bookFav]);

      setAvailableBooks((prevBooks) => {
        return prevBooks.filter((el) => el.book["ISBN"] !== id);
      });
      setFilteredBooks((prevBooks) => {
        return prevBooks.filter((el) => el.book["ISBN"] !== id);
      });
    }
  };

  return (
    <div className="bg-gray-950 text-white min-h-screen font-sans">
      <Header
        genres={genres}
        handleFilter={handleFilter}
        handlePages={handlePages}
        pages={pages}
      />
      <main className="sm:w-3/5 w-screen m-auto">
        <ul>
          <li>
            <button onClick={() => setTab(0)}>
              Available Books ({availableBooks.length})
            </button>
          </li>
          <li>
            <button onClick={() => setTab(1)}>
              Lecture List ({favBooks.length})
            </button>
          </li>
        </ul>

        {tab == 0 ? (
          <BookList bookList={filteredBooks} handleFav={handleFav} />
        ) : (
          <BookList bookList={favFilteredBooks} handleFav={handleFav} tab={1} />
        )}
      </main>
    </div>
  );
}

export default App;
