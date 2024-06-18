"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = useState({ email: "", password: "", username: "" });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSignup = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup success", response.data);
      router.push("/login");
    } catch (error: any) {
      setLoading(false);
      console.log("Signup failed", error.message);
      toast.error(error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setButtonDisabled(!(user.email && user.password && user.username));
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div className="bg-white p-6 rounded-lg shadow-xl">
        <h1 className="text-purple-600 text-center mb-3 text-3xl font-bold">
          SIGN UP
        </h1>
        <hr className="mb-4 border-purple-600" />
        <label
          htmlFor="username"
          className="block text-sm font-medium text-gray-700"
        >
          Username
        </label>
        <input
          className="p-2 border border-gray-300 rounded-lg mb-4 w-full focus:outline-none focus:ring-2 focus:ring-purple-600 text-black mt-1"
          id="username"
          type="text"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder="Enter your username"
        />
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          className="p-2 border border-gray-300 rounded-lg mb-4 w-full focus:outline-none focus:ring-2 focus:ring-purple-600 text-black mt-1"
          id="email"
          type="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="Enter your email"
        />
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <input
          className="p-2 border border-gray-300 rounded-lg mb-4 w-full focus:outline-none focus:ring-2 focus:ring-purple-600 text-black mt-1"
          id="password"
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="Enter your password"
        />
        <p className="font-bold mt-4 mb-4 text-red-500 text-sm text-center">
          {error ? `${error}` : ""}
        </p>
        <p className="font-bold mb-4 text-gray-900 text-sm text-center">
          {loading ? "Processing..." : ""}
        </p>
        <button
          onClick={onSignup}
          className={`p-2 w-full rounded-lg mb-4 ${
            buttonDisabled
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-purple-600 text-white hover:bg-purple-700"
          } focus:outline-none focus:ring-2 focus:ring-purple-600`}
          disabled={buttonDisabled}
        >
          {buttonDisabled ? "Fill all fields" : "Signup"}
        </button>
        <p className="text-sm text-center">
          <Link
            href="/login"
            className="text-purple-600 hover:underline hover:text-purple-700"
          >
            Already have an account? Login
          </Link>
        </p>
      </div>
    </div>
  );
}
