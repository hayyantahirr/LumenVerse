import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { db } from "../config/Firebase/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import Loading from "../components/Loading";
import BookMark from "../components/BookMark";
import { useDispatch, useSelector } from "react-redux";
import { addToBookMark } from "../config/Redux/bmSlice";

const BlogDetail = () => {
  const params = useParams();
  const [blog, setBlog] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const bookMark = useSelector((state) => state.bookMark);

  async function getDatafromdb() {
    const q = query(collection(db, "Blogs"), where("id", "==", params.id));

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
      {!blog ? (
        // 👇 Loading Screen
        <Loading />
      ) : (
        // 👇 Your actual data

        <div className="w-[76%] text-white mx-auto flex flex-col justify-center mt-15 ">
          {/* heading and sub Heading started */}
          <div className="">
            <h1 className="text-3xl font-bold mt-10 mb-3 border-b-2 pb-5 border-gray-700">
              <span className="opacity-40 italic text-yellow-400">Title :</span>
              {blog?.title}
            </h1>
            <h2 className="text-lg opacity-20">
              <span className="opacity-80 italic text-yellow-400">
                Subtext :
              </span>
              {blog?.subText}
            </h2>
          </div>
          {/* heading and sub Heading ended */}
          {/* Article started */}
          <div className="border-b-2 pb-5 border-gray-700">
            <h3 className="mt-10 opacity-40 italic text-yellow-400">
              Article :
            </h3>
            <article className=" mb-3 text-xl w-[90%] mx-auto opacity-70 text-slate-50">
              {blog?.Article}
            </article>
          </div>
          {/* Article ended */}
          {/* Tags started */}
          <div className="flex mt-5 opacity-70">
            <span className=" italic text-yellow-400"> 🏷️ Tags :</span>
            <h4 className="w-[90%] mx-auto">{blog?.tags}</h4>
          </div>
          {/* Tags ended */}
          {/* Add to book Mark Button started  */}
          <button
            onClick={() => {
              if (!isBookmarked) {
                dispatch(addToBookMark({ ...blog, quantity: 1 }));
              }
            }}
            disabled={isBookmarked}
            className={`mt-6 ml-6 cursor-pointer flex items-center rounded-md duration-100 p-2 w-[170px] 
        ${
          isBookmarked
            ? "bg-gray-500 opacity-70"
            : "bg-[#0d195c] hover:bg-[#0f172a]"
        }`}
          >
            <svg
              viewBox="0 -0.5 25 25"
              height="20px"
              width="20px"
              xmlns="http://www.w3.org/2000/svg"
              className={isBookmarked ? "fill-gray-400" : "fill-sky-400"}
            >
              <path
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="1.5"
                d="M18.507 19.853V6.034C18.5116 5.49905 18.3034 4.98422 17.9283 4.60277C17.5532 4.22131 17.042 4.00449 16.507 4H8.50705C7.9721 4.00449 7.46085 4.22131 7.08577 4.60277C6.7107 4.98422 6.50252 5.49905 6.50705 6.034V19.853C6.45951 20.252 6.65541 20.6407 7.00441 20.8399C7.35342 21.039 7.78773 21.0099 8.10705 20.766L11.907 17.485C12.2496 17.1758 12.7705 17.1758 13.113 17.485L16.9071 20.767C17.2265 21.0111 17.6611 21.0402 18.0102 20.8407C18.3593 20.6413 18.5551 20.2522 18.507 19.853Z"
                clipRule="evenodd"
                fillRule="evenodd"
              ></path>
            </svg>
            <span className="text-sm text-[#ffffff] font-bold pr-1">
              {isBookmarked ? "Already Bookmarked" : "Add to BookMarks"}
            </span>
          </button>
          {/* Add to book Mark Button ended  */}
          {/* Go to home button started  */}
          <button
            className="mt-6 bg-white text-center w-40 mx-auto rounded-2xl h-10 relative text-black text-xl font-semibold group cursor-pointer"
            type="button"
            title="Go Back"
            onClick={() => navigate(-1)}
          >
            <div className=" bg-[#001229] rounded-xl h-8 w-1/4 flex items-center justify-center absolute left-1 top-[4px] group-hover:w-[150px] z-10 duration-500 text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1024 1024"
                height="25px"
                width="25px"
              >
                <path
                  d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
                  fill="#ffffff"
                ></path>
                <path
                  d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
                  fill="#ffffff"
                ></path>
              </svg>
            </div>
            <p className="translate-x-2">Go Back</p>
          </button>
          {/* Go to home button ended  */}
          <BookMark />
        </div>
      )}
      s
    </>
  );
};

export default BlogDetail;
