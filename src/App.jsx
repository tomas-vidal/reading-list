import { AiOutlineSearch } from "react-icons/ai";
import Header from "./components/Header";
import BookList from "./components/BookList";

function App() {
  return (
    <div className="bg-gray-950 text-white min-h-screen font-sans">
      <Header />
      <main className="sm:w-3/5 w-screen m-auto">
        <BookList />
      </main>
    </div>
  );
}

export default App;
