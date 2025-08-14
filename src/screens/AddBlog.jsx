import { addDoc, collection, updateDoc } from "firebase/firestore";
import { useRef } from "react";
import { db } from "../config/Firebase/firebase";

const AddBlog = () => {
  const title = useRef();
  const subtext = useRef();
  const article = useRef();
  const tags = useRef();

  // Adding blog to firebase db

  async function submitBlog(e) {
    e.preventDefault();
    console.log(title.current.value);
    console.log(subtext.current.value);  
    console.log(article.current.value);
    console.log(tags.current.value);
    const docRef = await addDoc(collection(db, "Blogs"), {
      title: title.current.value,
      subText: subtext.current.value,

      Article: article.current.value,
      tags: tags.current.value,
    });
    console.log("Document written with ID: ", docRef.id);

    await updateDoc(docRef, {
      id: docRef.id,
    });
  }

  return (
    <>
      <h1>Create your blog now ! </h1>
      <form
        action=""
        className="bg-white flex flex-col gap-3 w-[80%] mx-auto justify-center items-center"
        onSubmit={submitBlog}
      >
        <input
          type="text"
          name=""
          id=""
          placeholder="Title"
          className="border mt-5 w-[80%] rounded-2xl "
          ref={title}
        />
        <input
          type="text"
          name=""
          id=""
          placeholder="Sub-Text"
          className="border mt-5 w-[80%] rounded-2xl "
          ref={subtext}
        />
        <textarea
          placeholder="Enter your Article/Blog"
          className="border mt-5 w-[80%] h-[100px] rounded-2xl resize-none overflow-hidden"
          onInput={(e) => {
            e.target.style.height = "100px"; // reset to base height
            e.target.style.height = e.target.scrollHeight + "px"; // expand as needed
          }}
          ref={article}
        ></textarea>

        <input
          type="text"
          name=""
          id=""
          placeholder="Tags"
          className="border mt-5 w-[80%] rounded-2xl "
          ref={tags}
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default AddBlog;
