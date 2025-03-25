import { useDispatch, useSelector } from "react-redux";
import { deleteTask, toggleTaskCompletion } from "../redux/taskSlice";
import { RootState } from "../redux/store";
import { FaCheck, FaTrash } from "react-icons/fa";
import { useState } from "react";
import { motion } from "motion/react";

const TaskList = () => {
  const tasks = useSelector((state: RootState) => state.tasks);
  const weather = useSelector((state: RootState) => state.weather?.data);
  const dispatch = useDispatch();
  const [filter, setFilter] = useState<
    "all" | "completed" | "incomplete" | "outdoor"
  >("all");

  const outdoorKeywords = [
    // General Outdoor Terms
    "outdoor",
    "outside",
    "open air",
    "fresh air",
    "nature",
    "wilderness",
    "field",
    "park",
    "countryside",
    "garden",

    // Movement/Action Words
    "walk",
    "run",
    "jog",
    "hike",
    "trek",
    "travel",
    "explore",
    "adventure",
    "picnic",
    "camp",
    "bike",
    "cycle",

    // Sports & Recreational Activities
    "soccer",
    "football",
    "basketball",
    "volleyball",
    "tennis",
    "golf",
    "swimming",
    "fishing",
    "hunting",
    "skiing",
    "snowboarding",
    "skating",
    "cricket",

    // Work & Chores Outside
    "gardening",
    "farming",
    "yard work",
    "landscaping",
    "construction",
    "delivery",
    "maintenance",
  ];

  const badWeatherConditions = [
    "rain",
    "storm",
    "snow",
    "hail",
    "fog",
    "thunder",
  ];
  const isWeatherBad =
    weather &&
    (weather.current.temp_c < 8 ||
      weather.current.temp_c > 45 || // Too cold or too hot
      badWeatherConditions.some((condition) =>
        weather.current.condition.text.toLowerCase().includes(condition),
      ));

  // Filter tasks based on the selected filter
  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "incomplete") return !task.completed;
    if (filter === "outdoor")
      return outdoorKeywords.some((word) =>
        task.text.toLowerCase().includes(word),
      );
    return true; // Default: Show all tasks
  });

  return (
    <div className="mt-6">
      {/* Filter Buttons */}
      <div className="flex gap-2 mb-4">
        {["all", "completed", "incomplete", "outdoor"].map((type) => (
          <button
            key={type}
            className={`px-2 py-1 rounded-lg text-sm font-medium transition ${
              filter === type
                ? "bg-black text-white"
                : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
            }`}
            onClick={() =>
              setFilter(type as "all" | "completed" | "incomplete" | "outdoor")
            }
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      {filteredTasks.length === 0 ? (
        <p className="text-center text-zinc-500">No tasks found. 🎯</p>
      ) : (
        <ul className="space-y-3 px-2 overflow-y-scroll overflow-hidden max-h-[30vh] scrollbar py-2">
          {filteredTasks.map((task) => (
            <motion.li
              initial={{ opacity: 0, scaleX: 0.5 }} // Starts hidden and slightly above
              animate={{ opacity: 1, scaleX: 1 }} // Fades in and moves to its position
              transition={{ duration: 0.5, ease: "easeInOut", type: "spring" }} // Smooth transition
              key={task.id}
              className={`flex flex-col justify-between items-center h-fit p-4 rounded-3xl shadow ${
                task.completed ? "bg-zinc-300" : "bg-white"
              }`}
            >
              <div className="flex justify-between items-center w-full ">
                <div className="flex-1 ">
                  <span
                    className={`font-medium ${task.completed ? "line-through text-zinc-600" : "text-black"}`}
                  >
                    {task.text}
                  </span>
                </div>

                {/* Priority Badge */}
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    task.priority === "High"
                      ? "text-red-400 bg-red-50"
                      : task.priority === "Medium"
                        ? "text-amber-400 bg-amber-50"
                        : "text-green-400 bg-green-50"
                  }`}
                >
                  {task.priority}
                </span>

                {/* Show Weather for Outdoor Tasks */}
                {weather &&
                  outdoorKeywords.some((word) =>
                    task.text.toLowerCase().includes(word),
                  ) && (
                    <div className="text-sm text-center text-zinc-700 mt-2 md:mt-0 md:ml-4">
                      <p className="font-semibold">
                        🌤 {weather.current.temp_c}°C
                      </p>
                      <p>{weather.current.condition.text}</p>
                    </div>
                  )}

                {/* Toggle Completion Button */}
                <button
                  className={`ml-4 p-2 rounded-lg transition duration-300 ${
                    task.completed
                      ? "bg-gray-100 text-zinc-500 hover:opacity-50"
                      : "bg-green-100 text-green-500 hover:opacity-50"
                  }`}
                  onClick={() => dispatch(toggleTaskCompletion(task.id))}
                >
                  <FaCheck />
                </button>

                {/* Delete Button */}
                <button
                  className="ml-4 p-2 bg-red-100 text-red-500 rounded-lg hover:opacity-50 transition duration-300"
                  onClick={() => dispatch(deleteTask(task.id))}
                >
                  <FaTrash />
                </button>
              </div>
              <div className="">
                {isWeatherBad &&
                  weather &&
                  outdoorKeywords.some((word) =>
                    task.text.toLowerCase().includes(word),
                  ) && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="p-4 my-5 mx-2 bg-red-50 text-red-800 rounded-xl text-center font-medium mb-3"
                    >
                      ⚠️ The weather might not be great for outdoor tasks.
                      Consider rescheduling!
                    </motion.p>
                  )}
                {!isWeatherBad &&
                  weather &&
                  outdoorKeywords.some((word) =>
                    task.text.toLowerCase().includes(word),
                  ) && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="p-4 my-5 mx-2 bg-amber-50 text-green-800 rounded-xl text-center font-medium mb-3"
                    >
                      🌞 The weather is perfect for outdoor activities! Go out
                      and have some fun! 🚴‍♂️🏕️
                    </motion.p>
                  )}
              </div>
            </motion.li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
