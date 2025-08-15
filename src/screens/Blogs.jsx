import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../config/Firebase/firebase";
import Loading from "../components/Loading";

const Blogs = () => {
  const [blog, setBlog] = useState([]);

  async function getDatafromdb(params) {
    const q = query(collection(db, "Blogs"));

    const querySnapshot = await getDocs(q);
    const alldocs = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return data;
    });
    setBlog(alldocs);
    console.log(alldocs);
  }

  useEffect(() => {
    getDatafromdb();
  }, []);
  return (
    <>
      <div className="w-[80%] mx-auto gap-5 flex flex-wrap justify-center mt-15">
        {blog?.length > 0 ? (
          blog.map((item) => (
            <Card
              key={item.id}
              title={item.title}
              subText={item.subText}
              article={item.Article.slice(0,100)}
              tags={item.tags}
              id={item.id}
            />
          ))
        ) : (
          <Loading />
        )}
      </div>
    </>
  );
};

export default Blogs;
