import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    // Store user data in local storage
    localStorage.setItem(
      "authUser",
      JSON.stringify({ ...formData, isAuthenticated: true }),
    );

    console.log("User Data Saved:", formData); // Debugging
    navigate("/signin");
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white container mx-auto p-8 shadow-lg rounded-xl w-96 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Sign Up</h2>

        <input
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none mb-4"
          type="text"
          name="username"
          placeholder="Enter username"
          value={formData.username}
          onChange={handleChange}
        />

        <input
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none mb-4"
          type="password"
          name="password"
          placeholder="Enter password"
          value={formData.password}
          onChange={handleChange}
        />

        <button
          className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:opacity-70 transition duration-300"
          onClick={handleSubmit}
        >
          Sign Up
        </button>

        <p className="mt-4 text-gray-600">
          Already have an account?{" "}
          <span
            className="font-thin hover:underline cursor-pointer"
            onClick={() => navigate("/signin")}
          >
            Sign In
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
