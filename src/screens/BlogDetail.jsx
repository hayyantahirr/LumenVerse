import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { db } from "../config/Firebase/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import Loading from "../components/Loading";

const BlogDetail = () => {
  const params = useParams();
  const [blog, setBlog] = useState();
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
  return (
    <>
      <div className="w-[76%] text-white mx-auto flex flex-col justify-center ">
        <div className="">
          <h1 className="text-3xl font-bold mt-10 mb-3 border-b-2 pb-5 border-gray-700">
            <span className="opacity-40 italic text-yellow-400">Title : </span>
            {blog?.title}
          </h1>
          <h2 className="text-lg opacity-20">
            <span className="opacity-80 italic text-yellow-400">
              Subtext :{" "}
            </span>
            {blog?.subText}
          </h2>
        </div>
        <div className="border-b-2 pb-5 border-gray-700">
          <h3 className="mt-10 opacity-40 italic  text-yellow-400">
            Article :{" "}
          </h3>
          <h3 className=" mb-3 text-xl w-[90%] mx-auto opacity-70 text-slate-50">
            {blog?.Article}
          </h3>
        </div>
        <div className="flex  mt-5 opacity-70">
          <span className=" italic text-yellow-400"> 🏷️ Tags :</span>
          <h4 className="w-[90%] mx-auto">{blog?.tags}</h4>
        </div>

        <button
          title="Save"
          className="mt-6 ml-6 cursor-pointer flex items-center fill-sky-400 bg-[#0d195c] hover:bg-[#0f172a]   rounded-md duration-100 p-2 w-[170px]"
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
            ></path>
          </svg>
          <span classNAme="text-sm text-lime-400 font-bold pr-1">
            Add to BookMarks
          </span>
        </button>
      </div>
    </>
  );
};

export default BlogDetail;
