import { AiOutlineSearch } from "react-icons/ai";

function App() {
  return (
    <div className="bg-black text-white h-screen">
      <header className="lg:w-3/5 w-screen m-auto border-b-4 pb-5">
        <h1 className="text-5xl pt-20 pb-16">My library</h1>
        <section className="flex justify-between h-40">
          <div className="relative w-1/3 self-end">
            <input
              className="border text-sm rounded-lg p-2.5 bg-gray-700 border-gray-600 w-full "
              type="text"
              placeholder="Search books"
            />
            <AiOutlineSearch className="text-2xl absolute top-1/2 right-[-5px] transform -translate-x-1/2 -translate-y-1/2" />
          </div>
          <div className="flex gap-5 w-1/3 items-end">
            <label className="block h-full">Filter by genre</label>
            <select className="border text-sm rounded-lg p-2.5 bg-gray-700 border-gray-600 w-full">
              <option>hola</option>
              <option>hola</option>
              <option>hola</option>
            </select>
            <label className="flex h-full flex-col w-full">
              Pages
              <span className="block-inline text-sm italic text-white/30">
                {" "}
                (max. 1000)
              </span>
            </label>
            <input
              className="border-2 accent-gray-600 align w-full self-center h-full"
              type="range"
            ></input>
          </div>
        </section>
      </header>
    </div>
  );
}

export default App;
