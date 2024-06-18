"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function ResetPasswordPage() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [token, setToken] = useState("");
  const [resetDone, setResetDone] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const resetPassword = async (e: any) => {
    e.preventDefault();
    if (!newPassword || !confirmPassword) {
      setError("Password can't be empty");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords doesn't match");
      return;
    }
    try {
      setLoading(true);
      setError("");
      await axios.post("/api/users/resetpassword", { newPassword, token });
      setResetDone(true);
    } catch (error: any) {
      setLoading(false);
      console.log(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div className="bg-white p-6 rounded-lg shadow-xl w-80">
        {resetDone ? (
          <div className="flex justify-center flex-col">
            <div className="flex flex-col justify-center border border-white rounded-lg p-2">
              <p className=" text-2xl mb-6 block font-medium text-gray-700">
                Hurray, password reset successfull
              </p>
              <button className="p-2 w-full border bg-purple-600 hover:bg-purple-700 transition-colors duration-200 ease-in-out border-purple-600 rounded-lg focus:outline-none focus:border-gray-600">
                <Link href="/login">Login Now</Link>
              </button>
            </div>
          </div>
        ) : (
          <>
            <h1 className="text-purple-600 text-center mb-3 text-3xl font-bold">
              Reset Password
            </h1>
            <hr className="mb-4 border-purple-600" />
            <form
              className="flex flex-col justify-evenly"
              onSubmit={resetPassword}
            >
              <div className="flex flex-col justify-evenly ">
                <label
                  htmlFor={newPassword}
                  className="block text-sm font-medium text-gray-700"
                >
                  New Password:
                </label>
                <input
                  type="password"
                  placeholder="New Password"
                  className="p-2 border border-gray-300 rounded-lg mb-4 w-full focus:outline-none focus:ring-2 focus:ring-purple-600 text-black mt-1"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className="flex flex-col justify-evenly ">
                <label
                  htmlFor={confirmPassword}
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm New Password
                </label>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="p-2 border border-gray-300 rounded-lg  w-full focus:outline-none focus:ring-2 focus:ring-purple-600 text-black mt-1"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              {error && (
                <p className="font-bold mt-4 mb-4 text-red-500 text-sm text-center">
                  {error}
                </p>
              )}
              {loading && (
                <p className="font-bold mt-4 mb-4 text-gray-900 text-sm text-center">
                  "Processing..."
                </p>
              )}
              <button
                type="submit"
                className="p-2 w-full border bg-purple-600 hover:bg-purple-700 transition-colors duration-200 ease-in-out border-purple-600 rounded-lg focus:outline-none focus:border-gray-600"
              >
                Reset Password
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default ResetPasswordPage;
