import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r text-black px-4">
      <div className="max-w-2xl text-center space-y-6">
        <h1 className="text-5xl md:text-6xl font-extrabold drop-shadow-lg">
          Stay Organized, Stay Productive
        </h1>
        <p className="text-lg md:text-xl opacity-90">
          Welcome to the <strong>Advanced To-Do App</strong> – your ultimate
          task management solution.
        </p>
        <div className="flex gap-4">
          <Link
            to="/signin"
            className="px-6 py-3 bg-white font-semibold rounded-lg shadow-md hover:bg-gray-100 transition duration-300"
          >
            Sign In
          </Link>
          <Link
            to="/signup"
            className="px-6 py-3 bg-black text-white font-semibold rounded-lg shadow-md hover:opacity-70 transition duration-300"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
