import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { auth } from "../config/Firebase/firebase";
import BookMark from "../components/BookMark";

const Home = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Firebase functions
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setUser(user);
        console.log(uid);
      } else {
        // User is signed out
        // ...
        navigate("/");
      }
    });
  }, []);

  function handleClick() {
    if (user) {
      navigate("");
    } else {
      console.log("Please Login First");
      document.getElementById("navbar-login-btn")?.click();
    }
  }
  return (
    <>
      {/* Main hero section */}
      <section className="bg-[#001229] w-[80%] mx-auto z-[-1] mt-5">
        <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
          <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl text-slate-50">
              A Universe Brought to Light
            </h1>
            <p className="max-w-2xl mb-6 font-light text-[#facc15] lg:mb-8 md:text-lg lg:text-xl opacity-50">
              Find and Save Blogs According to your Interests. Get your daily
              dose of knowledge with LumenVerse.
            </p>

            <a
              onClick={handleClick}
              className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
            >
              Get Started
              <svg
                className="w-5 h-5 ml-2 -mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </a>
          </div>
          <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
            <img src="/Images/tree-of-knowledge.png" alt="mockup" />
          </div>
        </div>
      </section>
      {/* Section 1 Start */}
      <section className="bg-[#001229] w-[80%] mx-auto">
        <div className="container px-6 py-10 mx-auto">
          <div className="lg:-mx-6 lg:flex lg:items-center">
            <img
              className="object-cover object-center lg:w-1/2 lg:mx-6 w-full h-96 rounded-lg lg:h-[36rem]"
              src="/Images/Mental peace.jpg"
              alt=""
            />

            <div className="mt-8 lg:w-1/2 lg:px-6 lg:mt-0">
              <p className="text-5xl font-semibold text-blue-500 ">“</p>

              <h1 className="text-2xl font-semibold text-gray-800 dark:text-white lg:text-3xl lg:w-96">
                Distract and Heal your mind
              </h1>

              <p className="max-w-lg mt-6 text-gray-500 dark:text-gray-400 ">
                “ Reading blogs from different genres can be a refreshing escape
                for the mind, offering a healthy break from daily stress.
                Whether it’s an inspiring personal story, a lighthearted travel
                experience, or a thought-provoking opinion piece, each genre
                stimulates different emotions and perspectives. This variety
                helps reduce anxiety, boost creativity, and improve mood.
                Engaging with diverse topics allows your brain to shift focus,
                promoting relaxation and mental clarity. Emotional connections
                to relatable content can bring comfort, while learning something
                new fosters a sense of achievement. Over time, regularly
                exploring such blogs becomes a simple yet effective habit for
                nurturing mental well-being. ”
              </p>

              <h3 className="mt-6 text-lg font-medium text-blue-500">
                Jane Doe
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                CEO at LumenVerse
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Section 1 ended */}
      <BookMark />
      {/* Section 2 Started  */}
      <section className="bg-[#001229] w-[80%] mx-auto" id="reviews">
        <div className="container px-6 py-10 mx-auto">
          <div className="mt-6 md:flex md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white">
                Some of our Daily Visitors
              </h1>

              <div className="flex mx-auto mt-6">
                <span className="inline-block w-40 h-1 bg-blue-500 rounded-full"></span>
                <span className="inline-block w-3 h-1 mx-1 bg-blue-500 rounded-full"></span>
                <span className="inline-block w-1 h-1 bg-blue-500 rounded-full"></span>
              </div>
            </div>
          </div>

          <section className="grid grid-cols-1 gap-8 mt-8 xl:mt-12 lg:grid-cols-2 xl:grid-cols-3">
            <div className="p-8 border rounded-lg dark:border-gray-700">
              <p className="leading-loose text-gray-500 dark:text-gray-400">
                “This blog website has been a daily boost for my mental health.
                The mix of genres keeps me engaged and inspired. Every visit
                feels refreshing, reducing stress and sparking creativity. It’s
                my go-to spot for positivity, relaxation, and fresh perspectives
                on life.”
              </p>

              <div className="flex items-center mt-8 -mx-2">
                <img
                  className="object-cover mx-2 rounded-full w-14 shrink-0 h-14 ring-4 ring-gray-300 dark:ring-gray-700"
                  src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                  alt=""
                />

                <div className="mx-2">
                  <h1 className="font-semibold text-gray-800 dark:text-white">
                    Robert Hayes
                  </h1>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    CTO, Robert Consultency
                  </span>
                </div>
              </div>
            </div>

            <div className="p-8 bg-blue-500 border border-transparent rounded-lg dark:bg-blue-600">
              <p className="leading-loose text-white">
                “This blog site is my perfect escape from daily stress. Whether
                it’s lifestyle tips or motivational reads, each post leaves me
                feeling lighter and happier. Just a few minutes here lifts my
                mood and refreshes my mind—it’s become part of my daily
                routine.”
              </p>

              <div className="flex items-center mt-8 -mx-2">
                <img
                  className="object-cover mx-2 rounded-full w-14 shrink-0 h-14 ring-4 ring-blue-200"
                  src="https://images.unsplash.com/photo-1531590878845-12627191e687?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80"
                  alt=""
                />

                <div className="mx-2">
                  <h1 className="font-semibold text-white">Alisson Schrader</h1>
                  <span className="text-sm text-blue-200">
                    CEO, Schrader Consultency
                  </span>
                </div>
              </div>
            </div>

            <div className="p-8 border rounded-lg dark:border-gray-700">
              <p className="leading-loose text-gray-500 dark:text-gray-400">
                “I love this blog site for its variety and calming effect. The
                wellness and motivational posts especially help me reset during
                stressful days. Short, uplifting reads make it easy to relax and
                think positively. It’s my quick mental refresh whenever I need
                it most.”
              </p>

              <div className="flex items-center mt-8 -mx-2">
                <img
                  className="object-cover mx-2 rounded-full w-14 shrink-0 h-14 ring-4 ring-gray-300 dark:ring-gray-700"
                  src="https://images.unsplash.com/photo-1488508872907-592763824245?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                  alt=""
                />

                <div className="mx-2">
                  <h1 className="font-semibold text-gray-800 dark:text-white">
                    Ema Brown
                  </h1>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Marketing Manager at Stech
                  </span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
      {/* Section 2 ended  */}
    </>
  );
};

export default Home;
