import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = "41288c1d766449b38b295543252503"; // Replace with your WeatherAPI key

interface WeatherLocation {
  name: string;
  region: string;
  country: string;
}

interface WeatherCondition {
  text: string;
  icon: string;
  code: number;
}

interface WeatherCurrent {
  temp_c: number;
  temp_f: number;
  condition: WeatherCondition;
  wind_kph: number;
  humidity: number;
}

interface WeatherData {
  location: WeatherLocation;
  current: WeatherCurrent;
}

interface WeatherState {
  data: WeatherData | null;
  status: "idle" | "loading" | "success" | "failed";
  error: string | null;
}

export const fetchWeather = createAsyncThunk<
  WeatherData,
  void,
  { rejectValue: string }
>("weather/fetch", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(
      `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=New Delhi`,
    );
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return rejectWithValue(
        err.response?.data?.error?.message || "Failed to fetch weather data.",
      );
    }
    return rejectWithValue("An unexpected error occurred.");
  }
});

const weatherSlice = createSlice({
  name: "weather",
  initialState: { data: null, status: "idle", error: null } as WeatherState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "success";
        state.error = null; // Clear any previous errors on success
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch weather data.";
      });
  },
});

export default weatherSlice.reducer;
