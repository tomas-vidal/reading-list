import React from "react";

export default function Tabs({ tab, setTab, availableBooks, favBooks }) {
  return (
    <ul className="flex items-center gap-4 text-sm my-3 w-full">
      <li>
        <button
          className={tab == 0 && "bg-gray-600 p-2.5 rounded-md font-semibold"}
          onClick={() => setTab(0)}
        >
          Available Books ({availableBooks.length})
        </button>
      </li>
      <li>
        <button
          className={tab == 1 && " bg-gray-600 p-2.5 rounded-md font-semibold"}
          onClick={() => setTab(1)}
        >
          Lecture List ({favBooks.length})
        </button>
      </li>
    </ul>
  );
}
