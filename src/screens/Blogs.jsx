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
      {blog ? (
        blog.map((item) => {
          return (
            <Card
              key={item.id}
              title={item.title}
              subText={item.subText}
              article={item.Article}
              tags={item.tags}
              id={item.id}
            />
          );
        })
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Blogs;
