"use client";
import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [userName, setUserName] = useState(null);
  const [email, setEmail] = useState(null);

  const getUserDetails = async () => {
    try {
      const response = await axios.get("/api/users/aboutME");
      setData(response.data.data);
      setUserName(response.data.data.userName);
      setEmail(response.data.data.email);
    } catch (error) {
      console.error("Error fetching user details:", error);
      toast.error("Failed to fetch user details.");
    }
  };

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      router.push("/login");
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error("Failed to log out.");
    }
  };

  const gotoChangePassword = () => {
    router.push("/changepassword");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-8 bg-gradient-to-br from-blue-100 to-blue-300 shadow-lg rounded-lg transition-transform duration-300 transform hover:scale-105">
      <h1 className="text-4xl font-bold mb-6 text-blue-900 animate-bounce">
        Profile Page
      </h1>
      <hr className="w-1/3 border-blue-300 m-6" />
      <div className="text-xl mb-6">
        {data === null ? (
          <p className="text-gray-700">No data found</p>
        ) : (
          <>
            <p className="text-blue-800">
              Your username:{" "}
              <Link
                href={`/profile/${userName}`}
                className="text-blue-600 hover:text-blue-800 hover:underline"
              >
                {userName}
              </Link>
            </p>
            <p className="text-blue-800">
              Your email:{" "}
              {email}
            </p>
          </>
        )}
      </div>
      <hr className="w-1/3 border-blue-300 mb-6" />
      <div className="space-x-4">
        <button
          onClick={getUserDetails}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full shadow-lg transition duration-300 transform hover:scale-110"
        >
          Get Your Details
        </button>
        <button
          onClick={logout}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-full shadow-lg transition duration-300 transform hover:scale-110"
        >
          Log Out
        </button>
        <button
          onClick={gotoChangePassword}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-full shadow-lg transition duration-300 transform hover:scale-110"
        >
          Change Password
        </button>
      </div>
    </div>
  );
}
