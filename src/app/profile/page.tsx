"use client";
import axios from "axios";
import Link from "next/link";
import { toast } from "react-hot-toast";

import { useRouter } from "next/navigation";
import { useState } from "react";

function Profile() {
  const router = useRouter();
  const [data, setData] = useState("nothing");

  const getUserDetail = async () => {
    try {
      const response = await axios.post("/api/users/me");
      setData(response.data.user._id);
    } catch (error: any) {
      console.error("User Not Found ", error);
      toast.error(error.message);
    }
  };

  const logout = async () => {
    try {
      await axios.post("/api/users/logout");
      toast.success("logout success");
      router.push("/login");
    } catch (error: any) {
      console.error(error);
      toast.error(error.message);
    }
  };
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="font-bold text-4xl">Profile Page</h1>
        <br />
        <h2 className="font-bold text-2xl">
          {data === "nothing" ? (
            "User Not Found"
          ) : (
            <Link className="text-white" href={`/profile/${data}`}>
              {data}
            </Link>
          )}
        </h2>
        <br />
        <button
          className="text-2xl p-2 border-4 border-gray-300 rounded-xl"
          onClick={logout}
        >
          Logout
        </button>
        <br />
        <button
          className="text-2xl p-2 border-4 border-gray-300 rounded-xl"
          onClick={getUserDetail}
        >
          Get User Detail
        </button>
      </div>
    </>
  );
}

export default Profile;
