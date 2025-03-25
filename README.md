# Task Manager with Weather Awareness

## 🌟 Overview

This is a **Task Management Application** built with **React, TypeScript, Redux, and Tailwind CSS**. It allows users to add, filter, complete, and delete tasks while also integrating **weather awareness** to provide insights for outdoor activities.

## 🚀 Features

- **Add, complete, and delete tasks** 📝
- **Filter tasks**: All, Completed, Incomplete, and Outdoor tasks ✅
- **Priority labels**: High, Medium, and Low ⚡
- **Weather-based notifications** ☀️🌧️
  - If the weather is **bad**, users get a warning for outdoor tasks ⚠️
  - If the weather is **good**, users are encouraged to go outside 🚀
- **Smooth animations** using `motion/react` 💫

## 🛠️ Tech Stack

- **Frontend**: React (Vite), TypeScript, Tailwind CSS, Redux Toolkit
- **State Management**: Redux Toolkit
- **Animations**: Motion (Framer Motion)
- **Weather API**: Integrated weather data for outdoor task insights

## 📂 Project Structure

```
📦 Task Manager
├── 📂 src
│   ├── 📂 components
│   │   ├── TaskList.tsx  # Task rendering & weather-based filtering
│   │   ├── TaskForm.tsx  # Task input form
│   ├── 📂 redux
│   │   ├── taskSlice.ts  # Task state management
│   │   ├── weatherSlice.ts  # Weather state management
│   ├── 📂 styles
│   │   ├── globals.css  # Tailwind custom styles
│   ├── App.tsx  # Main app file
│   ├── main.tsx  # Entry point
├── 📜 README.md
├── 📜 package.json
```

## 📦 Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/your-username/task-manager.git
   cd task-manager
   ```

2. **Install dependencies:**

   ```sh
   npm install  # or yarn install
   ```

3. **Start the development server:**
   ```sh
   npm run dev  # or yarn dev
   ```

## 🌦️ Weather API Integration

This app integrates a **Weather API** to determine if the weather is good for outdoor activities. To configure it:

1. Sign up for an API key (e.g., OpenWeatherMap or WeatherAPI)
2. Store the API key in a `.env` file:
   ```sh
   VITE_WEATHER_API_KEY=your_api_key_here
   ```

## 🎯 Future Improvements

- Add **due dates** and reminders ⏳
- Enhance **weather-based notifications** with location-based insights 🌍
- Implement **dark mode** 🌙

## 🏆 Contributing

Contributions are welcome! Feel free to fork the repo and submit a PR. 🚀

## 📜 License

MIT License © 2025 Your Name

---

Enjoy using the Task Manager! 🎉
