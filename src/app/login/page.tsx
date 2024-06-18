"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();

  const [user, setUser] = useState({ email: "", password: "" });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onLogin = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await axios.post("/api/users/login", user);
      console.log("Login successful:", response.data);
      router.push("/profile");
    } catch (error: any) {
      setLoading(false);
      console.log("Login failed");
      toast.error(error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setButtonDisabled(!(user.email.length > 0 && user.password.length > 0));
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div className="bg-white p-6 rounded-lg shadow-xl w-80">
        <h1 className="text-purple-600 text-center mb-3 text-3xl font-bold">
          Log In
        </h1>
        <hr className="mb-4 border-purple-600" />
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          value={user.email}
          placeholder="Enter your email"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          className="p-2 border border-gray-300 rounded-lg mb-4 w-full focus:outline-none focus:ring-2 focus:ring-purple-600 text-black mt-1"
        />
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          value={user.password}
          placeholder="Enter your password"
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          className="p-2 border border-gray-300 rounded-lg mb-4 w-full focus:outline-none focus:ring-2 focus:ring-purple-600 text-black mt-1"
        />
        <p className="font-bold mt-4 mb-4 text-red-500 text-sm text-center">
          {error ? `${error}` : ""}
        </p>
        <p className="font-bold mb-4 text-gray-900 text-sm text-center">
          {loading ? "Processing..." : ""}
        </p>
        <button
          onClick={onLogin}
          className={`p-2 w-full rounded-lg mb-4 ${
            buttonDisabled
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-purple-600 text-white hover:bg-purple-700"
          } focus:outline-none focus:ring-2 focus:ring-purple-600`}
          disabled={buttonDisabled}
        >
          {buttonDisabled ? "Fill all fields" : "Login"}
        </button>
        <p className="text-sm text-center">
          <Link
            href="/login"
            className="text-purple-600 hover:underline hover:text-purple-700"
          >
            Didn't have an account? signup
          </Link>
        </p>
        <p className="text-sm text-center">
          <Link
            href="/forgotpassword"
            className="text-purple-600 hover:underline hover:text-purple-700"
          >
            Forgot Password
          </Link>
        </p>
      </div>
    </div>
  );
}
