import { FaRegStar } from "react-icons/fa";
import { LuStarOff } from "react-icons/lu";

function Book({
  cover,
  title,
  synopsis,
  genre,
  pages,
  key,
  handleFav,
  isbn,
  tab = 0,
}) {
  return (
    <div className="flex flex-col w-52" id={key}>
      <img className="w-full h-80 rounded-md object-cover" src={cover}></img>
      <div className="flex justify-between mt-3 min-h-[2.3rem]">
        <h2
          className="flex-grow font-bold
        leading-5"
        >
          {title}
        </h2>

        <button
          className="w-8 h-8 bg-gray-700 border-gray-600 p-2 rounded hover:bg-gray-500 hover:cursor-pointer transition ml-2 flex-shrink-0"
          onClick={() => handleFav(isbn)}
        >
          {tab == 0 ? <FaRegStar /> : <LuStarOff />}
        </button>
      </div>

      <p className="italic text-gray-600 text-sm mt-2">{synopsis}</p>
      <span className="mt-3 text-xs font-bold text-white/50">{genre}</span>
      <i className="font-light text-xs text-white/40">{pages} pages</i>
      <p></p>
    </div>
  );
}

export default Book;
