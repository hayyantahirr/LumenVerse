import { addDoc, collection, updateDoc } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { auth, db } from "../config/Firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";

const AddBlog = () => {
  const title = useRef();
  const subtext = useRef();
  const article = useRef();
  const tags = useRef();
  const [user, setUser] = useState(null);
  const [titleValid, setTitleValid] = useState(null); // null = untouched, true = valid, false = invalid
  const [charCount, setCharCount] = useState(0);
  const maxChars = 45;

  // Validation logics
  const handleTitleChange = (e) => {
    let value = e.target.value;

    // Count only non-space characters
    const charCountWithoutSpaces = value.replace(/\s/g, "").length;

    if (charCountWithoutSpaces <= maxChars) {
      setCharCount(charCountWithoutSpaces);
      setTitleValid(charCountWithoutSpaces >= 10); // or whatever your min length
      title.current.value = value;
    } else {
      // Prevent extra input if over the limit
      e.target.value = title.current.value;
    }

    // Remove spaces to count only actual characters
    let lettersOnly = value.replace(/\s+/g, "");
    let length = lettersOnly.length;

    // If exceeds max → cut it
    if (length > maxChars) {
      // cut extra chars but keep spaces untouched
      let trimmed = lettersOnly.slice(0, maxChars);
      // rebuild value with spaces but limited
      let newValue = "";
      let count = 0;
      for (let char of value) {
        if (char !== " ") {
          if (count < maxChars) {
            newValue += char;
            count++;
          }
        } else {
          newValue += char; // spaces always kept
        }
      }
      value = newValue;
      e.target.value = newValue;
      lettersOnly = trimmed;
      length = lettersOnly.length;
    }

    // set states
    setCharCount(length);

    if (length >= 10) {
      setTitleValid(true);
    } else {
      setTitleValid(false);
    }
  };

  // Get User Details

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setUser(user);
        console.log(user);
      } else {
        // User is signed out
        // ...
        navigate("/");
      }
    });
  }, []);
  // Adding blog to firebase db

  async function submitBlog(e) {
    e.preventDefault();
    console.log(title.current.value);
    console.log(subtext.current.value);
    console.log(article.current.value);
    console.log(tags.current.value);
    if (!validateForm()) return; // stop if invalid
    const docRef = await addDoc(collection(db, "Blogs"), {
      title: title.current.value,
      subText: subtext.current.value,
      Article: article.current.value,
      tags: tags.current.value,
      userName: user?.displayName,
      Uid: user?.uid,
    });
    console.log("Document written with ID: ", docRef.id);

    await updateDoc(docRef, {
      id: docRef.id,
    });

    title.current.value = "";
    subtext.current.value = "";
    article.current.value = "";
    tags.current.value = "";
  }

  return (
    <>
      <form
        action=""
        className=" flex flex-col gap-3 w-[80%]  mx-auto justify-center items-center mt-15"
        onSubmit={submitBlog}
      >
        <h1 className="text-3xl font-bold text-[#facc15] w-[80%] mx-auto mt-5 mb-2 opacity-55">
          Create your blog now !{" "}
        </h1>
        {/* Title input started  */}
        <div className="w-[80%] p-5 bg-gray-300 rounded-lg font-mono">
          <label
            className="block opacity-60 text-sm font-bold mb-2 text-gray-700"
            htmlFor="title-input"
          >
            Title
          </label>

          {/* Wrap input + counter in relative container */}
          <div className="relative w-full">
            <input
              className="text-sm custom-input w-full px-4 pr-14 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-blue-300 hover:shadow-lg hover:border-blue-300 bg-gray-100"
              placeholder="Enter your title here"
              type="text"
              id="title-input"
              ref={title}
              onChange={handleTitleChange}
            />

            {/* Counter inside input */}
            <span
              className={`absolute right-3 top-1/2 -translate-y-1/2 text-xs ${
                charCount >= maxChars ? "text-red-500" : "text-gray-500"
              }`}
            >
              {charCount}/{maxChars}
            </span>
          </div>

          {/* Title validation started */}
          {titleValid === false && (
            <div className="mt-2 flex items-center gap-1">
              <div className="w-4 fill-rose-500">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24,12A12,12,0,1,1,12,0,12.013,12.013,0,0,1,24,12ZM13,5H11V15h2Zm0,12H11v2h2Z"></path>
                </svg>
              </div>
              <p className="capitalize font-medium text-rose-500">
                Title Too Short.
              </p>
            </div>
          )}

          {titleValid === true && (
            <div className="mt-2 flex items-center gap-1">
              <div className="w-4 fill-lime-500">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="m12,0C5.383,0,0,5.383,0,12s5.383,12,12,12,12-5.383,12-12S18.617,0,12,0Zm-.091,15.419c-.387.387-.896.58-1.407.58s-1.025-.195-1.416-.585l-2.782-2.696,1.393-1.437,2.793,2.707,5.809-5.701,1.404,1.425-5.793,5.707Z"></path>
                </svg>
              </div>
              <p className="capitalize font-medium text-lime-500">Looks good</p>
            </div>
          )}
          {/* title validation ended */}
        </div>

        {/* Title input ended */}

        {/* subtext started */}
        <div className="w-[80%]  p-5 bg-gray-300  rounded-lg font-mono">
          <label
            className="block text-gray-700 opacity-60 text-sm font-bold mb-2"
            htmlFor="sub-text-input"
          >
            Sub-Text
          </label>
          <input
            className="text-sm custom-input w-[100%] px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-blue-300 hover:shadow-lg hover:border-blue-300 bg-gray-100"
            placeholder="Enter your sub-text here"
            type="text"
            id="sub-text-input"
            ref={subtext}
          />
        </div>
        {/* subtext ended */}
        {/* Article started */}
        <div className="w-[80%]  p-5 bg-gray-300  rounded-lg font-mono">
          <label
            className="block text-gray-700 opacity-60 text-sm font-bold mb-2"
            htmlFor="article-input"
          >
            Article
          </label>
          <textarea
            className="resize-none overflow-hidden text-sm custom-input w-[100%] px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-blue-300 hover:shadow-lg hover:border-blue-300 bg-gray-100"
            placeholder="Enter text here"
            type="text"
            id="article-input"
            ref={article}
            onInput={(e) => {
              e.target.style.height = "100px"; // reset to base height
              e.target.style.height = e.target.scrollHeight + "px"; // expand as needed
            }}
          ></textarea>
        </div>
        {/* Article ended */}
        {/* Tags Started  */}
        <div className="w-[80%]  p-5 bg-gray-300  rounded-lg font-mono">
          <label
            className="block text-gray-700 opacity-60 text-sm font-bold mb-2"
            htmlFor="tags-input"
          >
            Tags
          </label>
          <input
            className="overflow-hidden text-sm custom-input w-[100%] px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-blue-300 hover:shadow-lg hover:border-blue-300 bg-gray-100"
            placeholder="#EnterYourTagHere!"
            type="text"
            id="tags-input"
            ref={tags}
          />
        </div>
        {/* Tags Ended */}
        {/* Show Name Started  */}
        <div className="w-[80%]  p-5 bg-gray-300  rounded-lg font-mono">
          <label className="block text-gray-700 opacity-60 text-sm font-bold mb-2">
            Blog Post By :
          </label>

          <h1 className="opacity-60 overflow-hidden text-sm custom-input w-[100%] px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-blue-300 hover:shadow-lg hover:border-blue-300 bg-gray-100 cursor-not-allowed">
            {user?.displayName}
          </h1>
        </div>
        {/* Show Name Ended */}
        {/* Submit Button Started  */}
        <button
          type="submit"
          className="relative cursor-pointer py-4 px-8 text-center font-barlow inline-flex justify-center text-base uppercase text-white rounded-lg border-solid transition-transform duration-300 ease-in-out group outline-offset-4 focus:outline focus:outline-2 focus:outline-white focus:outline-offset-4 overflow-hidden mt-3"
        >
          <span className="relative z-20">Submit</span>

          <span className="absolute left-[-75%] top-0 h-full w-[50%] bg-white/20 rotate-12 z-10 blur-lg group-hover:left-[125%] transition-all duration-1000 ease-in-out"></span>

          <span className="w-1/2 drop-shadow-3xl transition-all duration-300 block border-[#D4EDF9] absolute h-[20%] rounded-tl-lg border-l-2 border-t-2 top-0 left-0"></span>
          <span className="w-1/2 drop-shadow-3xl transition-all duration-300 block border-[#D4EDF9] absolute group-hover:h-[90%] h-[60%] rounded-tr-lg border-r-2 border-t-2 top-0 right-0"></span>
          <span className="w-1/2 drop-shadow-3xl transition-all duration-300 block border-[#D4EDF9] absolute h-[60%] group-hover:h-[90%] rounded-bl-lg border-l-2 border-b-2 left-0 bottom-0"></span>
          <span className="w-1/2 drop-shadow-3xl transition-all duration-300 block border-[#D4EDF9] absolute h-[20%] rounded-br-lg border-r-2 border-b-2 right-0 bottom-0"></span>
        </button>
        {/* Submit Button Ended  */}
      </form>
    </>
  );
};

export default AddBlog;
