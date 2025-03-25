import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState(""); // ✅ Add password state

  const handleLogin = () => {
    if (!username.trim() || !password.trim()) return; // Prevent empty login
    dispatch(login({ username, password })); // ✅ Pass both username and password
    navigate("/to-do");
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white container mx-auto p-8 shadow-lg rounded-xl w-96 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Sign In</h2>
        <input
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none mb-4"
          placeholder="Enter username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none mb-4"
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)} // ✅ Capture password
        />
        <button
          className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:opacity-70 transition duration-300"
          onClick={handleLogin}
        >
          Sign In
        </button>
        <p className="mt-4 text-gray-600">
          Don't have an account?{" "}
          <span
            className="font-thin hover:underline cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
