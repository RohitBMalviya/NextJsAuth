"use client";

import axios from "axios";
import Link from "next/link";
// import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function VerifyEmail() {
  // const router = useRouter();
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  const [error1, setError1] = useState("");

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
      setError(false);
    } catch (error: any) {
      setError(true);
      setError1(error.response.data.error);
    }
  };

  useEffect(() => {
    setError(false);
    const token = window.location.search.split("=")[1];
    // const { query } = router;
    // const token = query?.token;
    setToken(token || "");
  }, []);

  useEffect(() => {
    setError(false);
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="font-bold text-4xl">Verify Email</h1>
        <br />
        <h2 className="text-2xl">{token ? `${token}` : "No Token"}</h2>

        {verified && (
          <div>
            <h2 className="text-2xl">Verified</h2>
            <br />
            <Link href={"/login"}>Login</Link>
          </div>
        )}
        {error && (
          <div>
            <h2 className="text-2xl">{error1} or Expired </h2>
          </div>
        )}
      </div>
    </>
  );
}

export default VerifyEmail;
