import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { auth } from "../config/Firebase/firebase";
import Login from "../components/Login";
import Register from "../components/Register";

const Home = () => {
  const navigate = useNavigate();

  const [modalType, setModalType] = useState(null); // "login" or "register" or null
  const modalRef = useRef();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log(uid);
      } else {
        // User is signed out
        // ...
        navigate("/");
      }
    });
  }, []);
  const logout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.

        console.log("user signed out successfully");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  const check = () => {
    const user = auth.currentUser;

    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      // ...
    } else {
      console.log("no user available");
    }
  };

  // Sign In component Logic

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setModalType(null);
      }
    };
    if (modalType) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalType]);


  return (
    <>
      <div>
        <button onClick={() => setModalType("login")}>Sign In</button>
        <button onClick={logout}>Log Out</button>
      </div>

      {/* Modal Overlay */}
      {modalType && (
        <div className="modal-overlay">
          <div className="modal-content" ref={modalRef}>
            {modalType === "login" && <Login setModalType={setModalType} />}
            {modalType === "register" && <Register setModalType={setModalType} />}
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
