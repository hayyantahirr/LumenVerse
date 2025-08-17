import { useDispatch, useSelector } from "react-redux";
import { removeFromBookMark } from "../config/Redux/bmSlice";

import { useNavigate } from "react-router";

const Bookmarks = ({ isOpen }) => {
  const bookMark = useSelector((state) => state.bookMark);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function handleClick(id) {
    navigate(`/blogs/${id}`);
    isOpen(false);
  }

  return (
    <>
      <div className="flex justify-center items-center  border-b-2 pb-2 border-gray-500">
        <button
          title="Minimize"
          className="w-6 h-6 mb-7 text-white text-sm rounded-full cursor-pointer mr-auto"
          onClick={() => isOpen(false)}
        >
          <img src="/Images/close.svg" alt="" />
        </button>
        <h1 className=" text-center font-bold text-2xl mr-12">
          Your BookMarks
        </h1>
      </div>

      {/* Container with fixed height and scroll */}
      <div className="mt-4 max-h-[220px] min-h-[200px] overflow-y-auto ">
        {bookMark && bookMark.length > 0 ? (
          bookMark.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center mb-5  pb-2"
            >
              <p
                className="w-[90%] text-l hover:underline cursor-pointer"
                onClick={() => {
                  handleClick(item.id);
                }}
              >
                {item.title}
              </p>
              <button
                onClick={() => dispatch(removeFromBookMark(item.id))}
                className="rounded-full mr-2 cursor-pointer"
              >
                <img src="/Images/delete.svg" alt="" className="w-[25px]" />
              </button>
            </div>
          ))
        ) : (
          <p className="text-center mt-4 text-gray-500">No bookmarks yet</p>
        )}
      </div>
    </>
  );
};

export default Bookmarks;
