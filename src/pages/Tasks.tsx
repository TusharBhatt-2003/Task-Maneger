import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeather } from "../redux/weatherSlice";
import { RootState, AppDispatch } from "../redux/store";
import TaskInput from "../components/TaskInput";
import TaskList from "../components/TaskList";
import { motion } from "motion/react";

export default function Tasks() {
  const dispatch = useDispatch<AppDispatch>();
  const { data } = useSelector((state: RootState) => state.weather);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchWeather());

    // Retrieve username from localStorage
    const storedUser = localStorage.getItem("authUser");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUsername(parsedUser.user?.username || "Guest");
    }
  }, [dispatch]);

  return (
    <div className="min-h-screen flex flex-col items-center bg-[#F7F7F7] justify-center p-6">
      <div className="w-full max-w-2xl container mx-auto bg-white shadow-lg rounded-3xl p-6">
        {/* Cozy Welcome Message */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-3xl font-bold text-gray-800 text-center mb-6"
        >
          Hey {username}! ☕
          <br />
          Welcome back to your cozy task space! 🌿
        </motion.h1>

        {/* Display Weather Data */}
        {data && (
          <motion.div
            initial={{ opacity: 0, scaleX: 0.5 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 1, ease: "easeInOut", type: "spring" }}
            className="p-4 bg-blue-50 text-blue-800 rounded-xl text-center mb-3"
          >
            <h2 className="text-lg font-semibold">🌤 Current Weather</h2>
            <p>
              {data.location?.name}, {data.location?.region}
            </p>
            <p className="font-medium">
              {data.current?.temp_c}°C, {data.current?.condition?.text}
            </p>
          </motion.div>
        )}

        <TaskInput />
        <TaskList />
      </div>
    </div>
  );
}
