import { AiOutlineSearch } from "react-icons/ai";

function Header({
  genres,
  handleFilter,
  handlePages,
  pages,
  handleSearch,
  search,
}) {
  return (
    <header className="sm:w-3/5 w-screen m-auto pb-5">
      <h1 className="text-5xl pt-20 pb-16">My library</h1>
      <section className="flex justify-between h-20">
        <div className="relative w-1/3 self-end">
          <input
            className="border text-sm rounded-lg p-2.5 bg-gray-700 border-gray-600 w-full "
            type="text"
            placeholder="Search books"
            value={search}
            onChange={(e) => {
              handleSearch(e.target.value);
            }}
          />
          <AiOutlineSearch className="text-2xl absolute top-1/2 right-[-5px] transform -translate-x-1/2 -translate-y-1/2" />
        </div>
        <div className="flex gap-5 w-1/3 items-end">
          <div className="flex flex-col w-1/2 h-[80px]">
            <label className="h-full font-bold">Filter by genre</label>
            <select
              onChange={(e) => handleFilter(e.target.value)}
              className="border text-sm rounded-lg p-2.5 bg-gray-700 border-gray-600 w-full mt-1"
            >
              {genres.map((genre, i) => {
                return (
                  <option value={genre} key={i}>
                    {genre}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="w-full flex flex-col h-[80px]">
            <label className="h-full font-bold">
              Pages
              <span className="text-sm italic text-white/30 ml-1 font-light">
                (max. {pages})
              </span>
            </label>
            <input
              className="accent-gray-600 align w-full py-2.5"
              type="range"
              value={pages}
              onChange={(e) => handlePages(e.target.value)}
              max="1300"
              min="1"
            ></input>
          </div>
        </div>
      </section>
    </header>
  );
}

export default Header;
