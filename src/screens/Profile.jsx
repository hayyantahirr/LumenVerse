import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../config/Firebase/firebase";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

const Profile = () => {
  const [user, setUser] = useState(null);
  const params = useParams();
  const [joinedSeconds, setJoinedSeconds] = useState(null);

  const DEFAULT_PROFILE_PIC = "/Images/No profile pic.jpg"; // <-- put your default image path here

  async function getUser() {
    const q = query(collection(db, "Users"), where("id", "==", params.id));
    const querySnapshot = await getDocs(q);
    const alldocs = querySnapshot.docs.map((doc) => doc.data());
    if (alldocs.length > 0) {
      setUser(alldocs[0]);
      setJoinedSeconds(alldocs[0]?.createdAt?.seconds || null);
    }
  }

  useEffect(() => {
    getUser();
  }, []);

  // Format date only if joinedSeconds exists
  const formattedDate = joinedSeconds
    ? new Date(joinedSeconds * 1000).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "N/A";

  return (
    <div className="text-white w-[80%] mx-auto">
      <h1 className="text-2xl mt-8">My Profile</h1>
      <div>
        <img
          src={user?.profilePic || DEFAULT_PROFILE_PIC} // fallback to default
          alt="Profile"
          className="w-[30%] mx-auto rounded-full mt-15"
        />
        <h1 className="text-xl mt-15 text-center">
          <span className="text-2xl">Name: </span>
          {user?.userName || "Unknown"}
        </h1>
        <h1 className="text-xl mt-5 text-center">
          <span className="text-2xl">Email: </span>
          {user?.userEmail || "Not Provided"}
        </h1>
        <h1 className="text-xl mt-5 text-center">
          <span className="text-2xl">Date Joined: </span>
          {formattedDate}
        </h1>
      </div>
    </div>
  );
};

export default Profile;
