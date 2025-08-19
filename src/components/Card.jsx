import { useNavigate } from "react-router";
import BookMark from "./BookMark";
import { useEffect, useState } from "react";

import { db } from "../config/Firebase/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { addToBookMark } from "../config/Redux/bmSlice";

const Card = ({ title, subText, article, tags, id, userName }) => {
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const dispatch = useDispatch();
  const bookMark = useSelector((state) => state.bookMark);
  function handleClick() {
    navigate(`/blogs/${id}`);
  }
  async function getDatafromdb() {
    const q = query(collection(db, "Blogs"), where("id", "==", id));

    const querySnapshot = await getDocs(q);
    const alldocs = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return data;
    });
    setBlog(alldocs[0]);
  }

  useEffect(() => {
    getDatafromdb();
  }, []);
  const isBookmarked = blog && bookMark.some((item) => item.id === blog.id);
  return (
    <>
      <div className="bg-white w-full md:w-[48%]   lg:w-[30%] rounded-[30px] flex flex-col justify-center hover:shadow-lg min-h-[280px] dark:bg-gray-800 dark:text-white items-start relative group">
        <div className="m-5">
          <div className="  text-2xl ">{title}</div>
          <div className=" text-left w-full mb-5">
            <h2 className=" roboto-mono-500 text-gray-800 dark:text-white opacity-20 text-l">
              {subText}
            </h2>
            <p className="mt-5 text-sm text-gray-500 dark:text-gray-300 mb-5">
              {article}...
            </p>
            <p className="mt-5 text-sm text-gray-500 dark:text-gray-300 mb-2">
              🏷️ Tags : {tags}...
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-300 opacity-50 text-end">
              Blog Post By : {userName}
            </p>
          </div>
          <div className="flex justify-between  items-center">
            <div
              onClick={handleClick}
              className=" bg-gray-300 dark:bg-gray-700 w-[115px]  rounded-lg    hover:ring-4 ring-gray-200 dark:ring-gray-400 hover:transition duration-700 ease-in-out cursor-pointer"
            >
              <h1 className="text-center py-2">Read More</h1>
            </div>
            {/* Add to book Mark Button started  */}
            <button
              onClick={() => {
                if (!isBookmarked) {
                  dispatch(addToBookMark({ ...blog, quantity: 1 }));
                }
              }}
              disabled={isBookmarked}
              className={` ml-6 cursor-pointer  rounded-md duration-100 w-[25px] `}
            >
              <span className="text-sm text-[#ffffff] font-bold ">
                {isBookmarked ? (
                  <img src="/Images/isBookMarked.svg" alt="" />
                ) : (
                  <img src="/Images/bookmark.svg" alt="" />
                )}
              </span>
            </button>
            {/* Add to book Mark Button ended  */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
