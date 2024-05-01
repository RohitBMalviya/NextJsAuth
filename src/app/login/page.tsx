"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [buttonDisable, setButtonDisable] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login success", response);
      router.push("/profile");
    } catch (error: any) {
      console.error("Sigup Failed", error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisable(false);
    } else {
      setButtonDisable(true);
    }
  }, [user]);
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <br />
        <br />
        <h1 className="font-bold text-2xl">
          {loading ? "Processing" : "Login"}
        </h1>
        <br />

        <label className="text-4xl" htmlFor="email">
          Email:
        </label>
        <br />
        <input
          className="text-black p-4 rounded-xl border-4 focus:outline-none focus:border-green-500"
          type="email"
          name="email"
          value={user.email}
          onChange={(e) => {
            setUser({ ...user, email: e.target.value });
          }}
          id="email"
        />
        <br />
        <br />
        <label className="text-4xl" htmlFor="password">
          Password:
        </label>
        <br />
        <input
          className="text-black p-4 rounded-xl border-4 focus:outline-none focus:border-green-500"
          type="password"
          name="password"
          value={user.password}
          onChange={(e) => {
            setUser({ ...user, password: e.target.value });
          }}
          id="password"
        />
        <br />
        <br />
        <button
          className="text-2xl p-2 border-4 border-gray-300 rounded-xl"
          onClick={onLogin}
        >
          {buttonDisable ? "No Login" : "Login"}
        </button>
        <br />
        <Link href={"/signup"}>Vist Register Page</Link>
      </div>
    </>
  );
}

export default Login;
