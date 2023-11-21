import { AiOutlineSearch } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Context } from "../context/UserContext";
import { useContext } from "react";
import axios from "axios";

function Header({
  genres,
  handleFilter,
  handlePages,
  pages,
  handleSearch,
  search,
}) {
  const { usernameLogged, setUsernameLogged, loading, setLoading } =
    useContext(Context);

  const handleLogout = () => {
    axios
      .post("/logout")
      .then(() => {
        setUsernameLogged("");
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <header className="md:w-full w-3/5 m-auto pb-5 relative">
      <div className="absolute right-5 top-5 flex gap-5">
        {!loading &&
          (!usernameLogged ? (
            <>
              <Link to="login">
                <p className="cursor-pointer"> Login </p>
              </Link>
              <Link to="register">
                <p className="cursor-pointer">Register</p>
              </Link>
            </>
          ) : (
            <button onClick={() => handleLogout()}>
              <p className="cursor-pointer">Logout</p>
            </button>
          ))}
      </div>
      <h1 className="text-5xl pt-20 pb-16">My library</h1>
      <section
        className="flex justify-between h-20 lg:h-40
      lg:flex-col lg:items-center"
      >
        <div className="relative w-1/3 self-end lg:self-center lg:w-full">
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
        <div className="flex gap-5 w-96 lg:w-full items-end">
          <div className="flex flex-col  w-1/2 h-[80px]">
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
