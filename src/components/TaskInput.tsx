import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../redux/taskSlice";

interface Task {
  id: number;
  text: string;
  priority: "High" | "Medium" | "Low";
  completed: boolean;
}

const TaskInput: React.FC = () => {
  const dispatch = useDispatch();
  const [task, setTask] = useState<string>("");
  const [priority, setPriority] = useState<Task["priority"]>("Medium");

  // Load tasks from localStorage when the component mounts
  useEffect(() => {
    const savedTasks: Task[] = JSON.parse(
      localStorage.getItem("tasks") || "[]",
    );
    savedTasks.forEach((task) => dispatch(addTask(task)));
  }, [dispatch]);

  const handleAddTask = () => {
    if (task.trim()) {
      const newTask: Task = {
        id: Date.now(),
        text: task,
        priority,
        completed: false,
      };

      // Dispatch to Redux store
      dispatch(addTask(newTask));

      // Save to localStorage
      const savedTasks: Task[] = JSON.parse(
        localStorage.getItem("tasks") || "[]",
      );
      localStorage.setItem("tasks", JSON.stringify([...savedTasks, newTask]));

      setTask(""); // Clear input after adding task
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4 rounded-xl shadow">
      <input
        className="flex-1 w-full p-3 border border-gray-300 rounded-xl focus:ring-1 focus:ring-black outline-none"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter task..."
      />

      <div className="flex flex-col md:flex-row w-full justify-between gap-5">
        <div>
          <label className="font-bold">Priority:</label>
          <div className="flex gap-2">
            {["High", "Medium", "Low"].map((level) => (
              <label
                key={level}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="radio"
                  name="priority"
                  value={level}
                  checked={priority === level}
                  onChange={(e) =>
                    setPriority(e.target.value as Task["priority"])
                  }
                  className="hidden"
                />
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium transition select-none ${
                    priority === level
                      ? level === "High"
                        ? "text-red-400 bg-red-50 border border-red-400"
                        : level === "Medium"
                          ? "text-amber-400 bg-amber-50 border border-amber-400"
                          : "text-green-400 bg-green-50 border border-green-400"
                      : "bg-zinc-100 text-zinc-500 border border-zinc-300"
                  }`}
                >
                  {level}
                </span>
              </label>
            ))}
          </div>
        </div>

        <button
          className="px-6 py-3 bg-black text-white font-semibold rounded-xl shadow hover:opacity-70 transition duration-300"
          onClick={handleAddTask}
        >
          Add Task
        </button>
      </div>
    </div>
  );
};

export default TaskInput;
