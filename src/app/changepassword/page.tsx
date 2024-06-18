"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function SignupPage() {
  const [password, setPassword] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const changePassword = async () => {
    if (password.oldPassword === password.newPassword) {
      setError("current password and new password are cannot be the same");
      return;
    }
    if (password.newPassword !== password.confirmPassword) {
      setError("New Password and confirm password doesn't match");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const response = await axios.post("/api/users/changepassword", password);
      console.log("password change success", response.data);
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
    setButtonDisabled(
      !(
        password.oldPassword &&
        password.newPassword &&
        password.confirmPassword
      )
    );
  }, [password]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div className="bg-white p-6 rounded-lg shadow-xl">
        <h1 className="text-purple-600 text-center mb-3 text-3xl font-bold">
          Change your password
        </h1>
        <hr className="mb-4 border-purple-600" />
        <label
          htmlFor="Old password"
          className="block text-sm font-medium text-gray-700"
        >
          Old password
        </label>
        <input
          className="p-2 border border-gray-300 rounded-lg mb-4 w-full focus:outline-none focus:ring-2 focus:ring-purple-600 text-black mt-1"
          id="Old password"
          type="password"
          value={password.oldPassword}
          onChange={(e) =>
            setPassword({ ...password, oldPassword: e.target.value })
          }
          placeholder="Old password"
        />
        <label
          htmlFor="New password"
          className="block text-sm font-medium text-gray-700"
        >
          New password
        </label>
        <input
          className="p-2 border border-gray-300 rounded-lg mb-4 w-full focus:outline-none focus:ring-2 focus:ring-purple-600 text-black mt-1"
          id="New password"
          type="password"
          value={password.newPassword}
          onChange={(e) =>
            setPassword({ ...password, newPassword: e.target.value })
          }
          placeholder="New password"
        />
        <label
          htmlFor="Confirm password"
          className="block text-sm font-medium text-gray-700"
        >
          confirm password
        </label>
        <input
          className="p-2 border border-gray-300 rounded-lg mb-4 w-full focus:outline-none focus:ring-2 focus:ring-purple-600 text-black mt-1"
          id="confirm password"
          type="password"
          value={password.confirmPassword}
          onChange={(e) =>
            setPassword({ ...password, confirmPassword: e.target.value })
          }
          placeholder="Confirm password"
        />
        <p className="font-bold mt-4 mb-4 text-red-500 text-sm text-center">
          {error ? `${error}` : ""}
        </p>
        <p className="font-bold mb-4 text-gray-900 text-sm text-center">
          {loading ? "Processing..." : ""}
        </p>
        <button
          onClick={changePassword}
          className={`p-2 w-full rounded-lg mb-4 ${
            buttonDisabled
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-purple-600 text-white hover:bg-purple-700"
          } focus:outline-none focus:ring-2 focus:ring-purple-600`}
          disabled={buttonDisabled}
        >
          {buttonDisabled ? "Fill all fields" : "Signup"}
        </button>
      </div>
    </div>
  );
}
