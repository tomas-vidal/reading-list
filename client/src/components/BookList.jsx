import { FaFaceSadTear } from "react-icons/fa6";
import Book from "./Book";

function BookList({ bookList, handleFav, tab = 0 }) {
  if (bookList.length < 1) {
    return (
      <div className="mt-32 flex flex-col items-center gap-10 text-gray-500">
        <FaFaceSadTear className="w-40 h-40" />
        <h2>What happened? There are no books available</h2>
      </div>
    );
  }

  return (
    <section>
      <ul className="grid grid-cols-4 items-start gap-4 lg:pt-5 lg:gap-y-10 lg:justify-items-center">
        {bookList.map((el, i) => {
          const book = el.book;

          return (
            <li key={i}>
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
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default BookList;
