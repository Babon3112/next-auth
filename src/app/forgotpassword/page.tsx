"use client";

import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sentEmail, setSentEmail] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      await axios.post("/api/users/forgotpassword", { email });
      setSentEmail(true);
    } catch (error: any) {
      setLoading(false);
      setError(error.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      {sentEmail ? (
        <div>
          <p className="text-xl text-center">
            Reset Password Email sent successfully!!
          </p>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-xl">
          <h1 className="text-purple-600 text-center mb-3 text-2xl font-bold">
            Send Password Recovery Email
          </h1>
          <hr className="mb-4 border-purple-600" />

          <form onSubmit={handleSubmit}>
            <input
              className="p-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-purple-600 text-black"
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
            <p className="font-bold mt-4 mb-4 text-red-500 text-sm text-center">
              {error ? `${error}` : ""}
            </p>
            <p className="font-bold mb-4 text-gray-900 text-sm text-center">
              {loading ? "Processing..." : ""}
            </p>

            <button
              type="submit"
              className="p-2 w-full border bg-purple-600 hover:bg-purple-700 transition-colors duration-200 ease-in-out border-purple-600  rounded-lg mb-4 focus:outline-none focus:border-gray-600"
            >
              Send password recovery email
            </button>
          </form>

          <p className="text-sm text-center">
            <Link
              href="/login"
              className="text-purple-600 hover:underline hover:text-purple-700"
            >
              Login Instead
            </Link>
          </p>
        </div>
      )}
    </div>
  );
}

export default ForgotPasswordPage;
