import { motion } from "motion/react";
import { Link } from "react-router-dom";
function Home() {
  const getRandomColor = () => {
    const colors = [
      "#ff4757",
      "#1e90ff",
      "#2ed573",
      "#ffa502",
      "#ff6b81",
      "#3742fa",
      "#f39c12",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className="relative h-screen grid place-items-center bg-zinc-100 lg:bg-black px-4 overflow-hidden">
      {/* Background Grid */}
      <div className="hidden absolute p-2 inset-0 lg:grid grid-cols-12 grid-rows-6 gap-2 ">
        {Array.from({ length: 72 }).map((_, i) => (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.5,
              ease: "easeInOut",
              type: "spring",
              damping: "10",
            }}
            whileHover={{
              scale: 0.9,
              backgroundColor: getRandomColor(), // Dynamically set background
            }}
            key={i}
            className="bg-white rounded-lg"
          ></motion.div>
        ))}
      </div>

      {/* Content */}
      <div
        className="relative max-w-2xl text-center space-y-6 p-7 rounded-3xl 
  bg-white"
      >
        <h1 className="text-5xl md:text-6xl font-extrabold drop-shadow-lg">
          Stay Organized, Stay Productive
        </h1>
        <p className="text-lg md:text-xl opacity-90">
          Welcome to the <strong>Advanced To-Do App</strong> – your ultimate
          task management solution.
        </p>
        <div className="grid grid-cols-2 gap-4 w-fit justify-center">
          <Link
            to="/signin"
            className="px-6 py-3 bg-white font-semibold rounded-lg shadow-md hover:bg-gray-100 transition duration-300 text-center text-black"
          >
            Sign In
          </Link>
          <Link
            to="/signup"
            className="px-6 py-3 bg-black text-white font-semibold rounded-lg shadow-md hover:opacity-70 transition duration-300 text-center"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
