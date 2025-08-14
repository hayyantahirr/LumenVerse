import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { auth } from "../config/Firebase/firebase";
import Login from "../components/Login";
import Register from "../components/Register";

const Home = () => {
  return (
    <>
      <h1>home</h1>
    </>
  );
};

export default Home;
