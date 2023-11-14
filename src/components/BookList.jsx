import data from "../../books.json";
import { FaRegStar } from "react-icons/fa";

import Book from "./Book";

function BookList() {
  return (
    <section>
      <h2>Books</h2>
      <div className="grid grid-cols-4 items-start justify-around gap-4">
        {data.library.map((el) => {
          const book = el.book;
          console.log(book);
          return (
            <div className="flex flex-col w-52">
              <img
                className="w-full h-80 rounded-md object-cover"
                src={book.cover}
              ></img>

              <div className="flex justify-between mt-3 min-h-[2.3rem]">
                <h2
                  className="flex-grow font-bold
                leading-5"
                >
                  {book.title}
                </h2>
                <FaRegStar className="w-8 h-8 ml-2 flex-shrink-0 bg-gray-700 border-gray-600 p-2 rounded hover:bg-gray-500 hover:cursor-pointer transition" />
              </div>
              <span className="mt-3 text-xs font-bold text-white/50">
                {book.genre}
              </span>
              <i className="font-light text-xs text-white/40">
                {book.pages} pages
              </i>
              <p className="italic text-gray-600 text-sm mt-2">
                {book.synopsis}
              </p>
              <p></p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default BookList;
