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
      <form
        action=""
        className=" flex flex-col gap-3 w-[80%]  mx-auto justify-center items-center"
        onSubmit={submitBlog}
      >
        <h1 className="text-3xl font-bold text-[#facc15] w-[80%] mx-auto mt-5 mb-2 opacity-55">
          Create your blog now !{" "}
        </h1>
        <div className="w-[80%]  p-5 bg-gray-300  rounded-lg font-mono">
          <label
            className="block opacity-60 text-sm font-bold mb-2 text-gray-700"
            htmlFor="unique-input"
          >
            Title
          </label>
          <input
            className="text-sm custom-input w-[100%] px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-blue-300 hover:shadow-lg hover:border-blue-300 bg-gray-100"
            placeholder="Enter your title here"
            type="text"
            id="unique-input"
            ref={title}
          />
        </div>

        <div className="w-[80%]  p-5 bg-gray-300  rounded-lg font-mono">
          <label
            className="block text-gray-700 opacity-60 text-sm font-bold mb-2"
            htmlFor="unique-input"
          >
            Sub-Text
          </label>
          <input
            className="text-sm custom-input w-[100%] px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-blue-300 hover:shadow-lg hover:border-blue-300 bg-gray-100"
            placeholder="Enter your sub-text here"
            type="text"
            id="unique-input"
            ref={subtext}
          />
        </div>

        <div className="w-[80%]  p-5 bg-gray-300  rounded-lg font-mono">
          <label
            className="block text-gray-700 opacity-60 text-sm font-bold mb-2"
            htmlFor="unique-input"
          >
            Article
          </label>
          <textarea
            className="resize-none overflow-hidden text-sm custom-input w-[100%] px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-blue-300 hover:shadow-lg hover:border-blue-300 bg-gray-100"
            placeholder="Enter text here"
            type="text"
            id="unique-input"
            ref={article}
            onInput={(e) => {
              e.target.style.height = "100px"; // reset to base height
              e.target.style.height = e.target.scrollHeight + "px"; // expand as needed
            }}
          ></textarea>
        </div>
        <div className="w-[80%]  p-5 bg-gray-300  rounded-lg font-mono">
          <label
            className="block text-gray-700 opacity-60 text-sm font-bold mb-2"
            htmlFor="unique-input"
          >
            Tags
          </label>
          <input
            className="overflow-hidden text-sm custom-input w-[100%] px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-blue-300 hover:shadow-lg hover:border-blue-300 bg-gray-100"
            placeholder="#EnterYourTagHere!"
            type="text"
            id="unique-input"
            ref={tags}
          />
        </div>

        <button type="submit" className="relative cursor-pointer py-4 px-8 text-center font-barlow inline-flex justify-center text-base uppercase text-white rounded-lg border-solid transition-transform duration-300 ease-in-out group outline-offset-4 focus:outline focus:outline-2 focus:outline-white focus:outline-offset-4 overflow-hidden mt-3">
          <span className="relative z-20">Submit</span>

          <span className="absolute left-[-75%] top-0 h-full w-[50%] bg-white/20 rotate-12 z-10 blur-lg group-hover:left-[125%] transition-all duration-1000 ease-in-out"></span>

          <span className="w-1/2 drop-shadow-3xl transition-all duration-300 block border-[#D4EDF9] absolute h-[20%] rounded-tl-lg border-l-2 border-t-2 top-0 left-0"></span>
          <span className="w-1/2 drop-shadow-3xl transition-all duration-300 block border-[#D4EDF9] absolute group-hover:h-[90%] h-[60%] rounded-tr-lg border-r-2 border-t-2 top-0 right-0"></span>
          <span className="w-1/2 drop-shadow-3xl transition-all duration-300 block border-[#D4EDF9] absolute h-[60%] group-hover:h-[90%] rounded-bl-lg border-l-2 border-b-2 left-0 bottom-0"></span>
          <span className="w-1/2 drop-shadow-3xl transition-all duration-300 block border-[#D4EDF9] absolute h-[20%] rounded-br-lg border-r-2 border-b-2 right-0 bottom-0"></span>
        </button>
      </form>
    </>
  );
};

export default AddBlog;
