import data from "../books.json";
import Header from "./components/Header";
import BookList from "./components/BookList";
import { useEffect, useState } from "react";
import Tabs from "./components/Tabs";

function App() {
  const [availableBooks, setAvailableBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [favBooks, setFavBooks] = useState([]);
  const [favFilteredBooks, setFavFilteredBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [genres, setGenres] = useState([]);
  const [genre, setGenre] = useState("All");
  const [pages, setPages] = useState(1300);
  const [tab, setTab] = useState(0);

  useEffect(() => {
    loadLocalJson("../books.json").then((res) => {
      setAvailableBooks(res.library);
      setFilteredBooks(res.library);
      setFiltersGenres(res.library);
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

  const setFiltersGenres = (data) => {
    const filterSet = new Set();
    data.map((el) => {
      const book = el.book;
      filterSet.add(book.genre);
    });
    setGenres(["All", ...filterSet]);
  };

  useEffect(() => {
    // filter all books everytime genre, pages, favbooks or search changes
    setFilteredBooks(filterAll(availableBooks));
    setFavFilteredBooks(filterAll(favBooks));
  }, [genre, pages, favBooks, search]);

  const filterAll = (list) => {
    let filteredList = list;

    if (search) {
      filteredList = filteredList.filter((item) => {
        const book = item.book;
        return book.title.toLowerCase().includes(search.toLowerCase());
      });
    }

    if (genre) {
      filteredList = filteredList.filter((item) => {
        const book = item.book;
        if (genre == "All") {
          return book;
        } else {
          return book.genre == genre;
        }
      });
    }

    if (pages) {
      filteredList = filteredList.filter((item) => {
        const book = item.book;
        return book.pages < pages;
      });
    }

    return filteredList;
  };

  const handleFilter = (filter = genre) => {
    setGenre(filter);
  };

  const handlePages = (pagesInput) => {
    setPages(pagesInput);
  };

  const handleSearch = (text) => {
    setSearch(text);
  };

  const handleFav = (id) => {
    // if you're on lecture tab
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
      setAvailableBooks([...availableBooks, ...bookFav]);
      setFilteredBooks([...filteredBooks, ...bookFav]);
    }

    // if you're on available books tab
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
    <div className="bg-gray-950 md:px-5 text-white min-h-screen font-sans">
      <Header
        genres={genres}
        handleFilter={handleFilter}
        handlePages={handlePages}
        pages={pages}
        handleSearch={handleSearch}
        search={search}
      />
      <main className="md:w-full w-3/5 h-full mx-auto">
        <Tabs
          tab={tab}
          setTab={setTab}
          availableBooks={availableBooks}
          favBooks={favBooks}
        />
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
