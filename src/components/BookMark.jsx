import { useState } from "react";
import Bookmarks from "./Bookmarks";
import { useSelector } from "react-redux";

const BookMark = ({}) => {
  const [isOpen, setIsOpen] = useState(false);

  const bookmarks = useSelector((state) => state.bookMark) || [];
  return (
    <>
      {/* Blur Background */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
      {/* The floating bubble modal */}
      {isOpen && (
        <div className=" fixed bottom-28 right-10 z-50 w-80 p-4 bg-[#083D77] shadow-xl rounded-2xl animate-scaleIn">
          <div className="text-sm text-gray-700 dark:text-gray-200">
            
            <Bookmarks isOpen ={setIsOpen}/>
          </div>
        </div>
      )}
      {/* Floating button */}
      <button
        title="Bookmarks"
        onClick={() => setIsOpen(true)}
        className=" fixed bottom-10 right-10 cursor-pointer bg-[#083D77] px-5 py-5 rounded-full text-white tracking-wider shadow-xl animate-bounce hover:animate-none active:animate-none z-10"
      >
        <svg
          viewBox="0 -0.5 25 25"
          height="20px"
          width="20px"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="1.5"
            d="M18.507 19.853V6.034C18.5116 5.49905 18.3034 4.98422 17.9283 4.60277C17.5532 4.22131 17.042 4.00449 16.507 4H8.50705C7.9721 4.00449 7.46085 4.22131 7.08577 4.60277C6.7107 4.98422 6.50252 5.49905 6.50705 6.034V19.853C6.45951 20.252 6.65541 20.6407 7.00441 20.8399C7.35342 21.039 7.78773 21.0099 8.10705 20.766L11.907 17.485C12.2496 17.1758 12.7705 17.1758 13.113 17.485L16.9071 20.767C17.2265 21.0111 17.6611 21.0402 18.0102 20.8407C18.3593 20.6413 18.5551 20.2522 18.507 19.853Z"
            clipRule="evenodd"
            fillRule="evenodd"
            fill="#38bdf8"
          ></path>
        </svg>
        {/* Count Badge */}
        {bookmarks.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-[#231F20] text-white text-xs font-bold px-2 py-1 rounded-full">
            {bookmarks.length}
          </span>
        )}
      </button>{" "}
    </>
  );
};

export default BookMark;
