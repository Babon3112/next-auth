"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function VerifyEmailPage() {
  // State variables
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  // Verify user email
  const verifyUserEmail = async () => {
    try {
      setLoading(true);
      await axios.post("/api/users/verifyEmail", { token });
      setVerified(true);
    } catch (error: any) {
      setError(true);
      console.error(
        "Verification error:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  // Extract token from URL and initiate verification
  useEffect(() => {
    setError(false);
    const urlToken = new URLSearchParams(window.location.search).get("token");
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
      <h1 className="text-4xl font-bold mb-4 text-gray-800">
        Verify Your Email
      </h1>
      {loading && <p className="text-lg text-blue-500 mb-4">Verifying...</p>}
      {!loading && (
        <>
          {verified ? (
            <div
              className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <strong className="font-bold">Success!</strong>
              <span className="block sm:inline">
                {" "}
                Your email has been verified.
              </span>
              <Link
                href="/login"
                className="underline text-blue-600 hover:text-blue-800 ml-2"
              >
                Log In
              </Link>
            </div>
          ) : (
            <div
              className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <strong className="font-bold">Info!</strong>
              <span className="block sm:inline">
                {" "}
                Waiting for email verification...
              </span>
              <p className="mt-2 text-sm text-gray-500">
                Token: {token || "No token found in URL"}
              </p>
            </div>
          )}
          {error && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4"
              role="alert"
            >
              <strong className="font-bold">Error!</strong>
              <span className="block sm:inline">
                {" "}
                Something went wrong. Please try again.
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
}
