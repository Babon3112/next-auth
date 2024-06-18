"use client";
import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();

  const [data, setData] = useState(null);

  const getUserDetails = async () => {
    try {
      const response = await axios.get("/api/users/aboutME");
      console.log(response.data.data);

      setData(response.data.data.userName);
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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-8 bg-gradient-to-br from-blue-100 to-blue-200">
      <h1 className="text-4xl font-bold mb-6 text-blue-900">Profile Page</h1>
      <hr className="w-1/3 border-blue-300 my-6" />
      <div className="text-xl mb-6">
        {data === null ? (
          <p className="text-gray-700">No data found</p>
        ) : (
          <p className="text-blue-800">
            Go to{" "}
            <Link href={`/profile/${data}`}>
              <a className="text-blue-600 hover:text-blue-800 hover:underline">
                {data}
              </a>
            </Link>
          </p>
        )}
      </div>
      <hr className="w-1/3 border-blue-300 my-6" />
      <div className="space-x-4">
        <button
          onClick={getUserDetails}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded shadow-md transition duration-300"
        >
          Get Your Details
        </button>
        <button
          onClick={logout}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded shadow-md transition duration-300"
        >
          Log Out
        </button>
      </div>
    </div>
  );
}
