import data from "../../books.json";
import Book from "./Book";

function BookList({ bookList, handleFav, tab = 0 }) {
  return (
    <section>
      <h2>Books</h2>
      <div className="grid grid-cols-4 items-start gap-4">
        {bookList.map((el, i) => {
          const book = el.book;

          return (
            <Book
              id={i}
              cover={book.cover}
              title={book.title}
              synopsis={book.synopsis}
              genre={book.genre}
              pages={book.pages}
              handleFav={handleFav}
              isbn={book["ISBN"]}
              tab={tab}
            />
          );
        })}
      </div>
    </section>
  );
}

export default BookList;
