import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromBookMark } from "../config/Redux/bmSlice";

const Bookmarks = () => {
  const bookMark = useSelector((state) => state.bookMark);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log(bookMark);
  }, []);
  return (
    <>
      {bookMark
        ? bookMark.map((item) => (
            <div>
              <p>{item.title}</p>
              <button
                onClick={() => {
                  dispatch(removeFromBookMark(item.id));
                }}
                className="bg-red-500 p-2"
              >
                Remove BookMark
              </button>
            </div>
          ))
        : "no bookmarks"}
    </>
  );
};

export default Bookmarks;
