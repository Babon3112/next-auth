"use client";
import React from "react";

export default function UserProfilePage({ params }: any) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-8 bg-gradient-to-r from-purple-300 to-blue-500 text-white">
      <header className="text-3xl font-bold mb-6">
        User Profile Page
      </header>
      <main className="flex flex-col items-center bg-white text-gray-800 p-6 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-2xl font-semibold p-4 bg-gray-200 rounded-lg mb-4">
          User ID: {params.id}
        </h2>
        <p className="text-lg">
          Welcome to the user profile page. Here you can find details about the user.
        </p>
      </main>
    </div>
  );
}
