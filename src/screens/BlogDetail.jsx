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
    console.log(alldocs);
  }

  useEffect(() => {
    getDatafromdb();
  }, []);
  return (
    <>
      <div className="w-[80%] text-white mx-auto flex flex-col justify-center ">
        <div className="">
          <h1 className="text-3xl font-bold mt-10 mb-3 border-b-2 pb-5 border-gray-700">
            <span className="opacity-40 italic text-yellow-400">Title : </span>
            {blog?.title}
          </h1>
          <h2 className="text-lg opacity-20">
            <span className="opacity-80 italic text-yellow-400">Subtext : </span>
            {blog?.subText}
          </h2>
        </div>
        <div className="border-b-2 pb-5 border-gray-700">
          <h3 className="mt-10 opacity-40 italic  text-yellow-400">Article : </h3>
          <h3 className=" mb-3 text-xl w-[90%] mx-auto opacity-70 text-slate-50">
            {blog?.Article}
          </h3>
        </div>
        <div className="flex  mt-5 opacity-70">
          <span className=" italic text-yellow-400"> 🏷️ Tags :</span>
          <h4 className="w-[90%] mx-auto">{blog?.tags}</h4>
        </div>
      </div>
    </>
  );
};

export default BlogDetail;
