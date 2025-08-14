import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/Firebase/firebase";
import { useState } from "react";

const Profile = () => {
const [user, setUser] = useState(null);


  async function getUser() {
    const docRef = doc(db, "cities", "SF");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  }

  return <div>Profile</div>;
};

export default Profile;
