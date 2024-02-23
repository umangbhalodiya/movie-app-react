import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import RequestStates from "../../../utils/request-states";

import {
  getMovieData,
  getMovieDetailsByID,
  getSerchedMovie,
  getTopMovie,
} from "./action";

// initial states for users
const initialState = {
  userData: {},
  loginStatus: false,
};
// get popular movie data
export const getPopularMovieData = createAsyncThunk(
  "movie/getPopularMovieData",
  async () => {
    const res = await getMovieData();
    return res.data;
  }
);
// get top movie data
export const getTopMovieData = createAsyncThunk(
  "movie/getTopMovieData",
  async () => {
    const res = await getTopMovie();
    return res.data;
  }
);
// get searched movie data
export const getSerchedMovieData = createAsyncThunk(
  "movie/getSerchedMovieData",
  async (body) => {
    const res = await getSerchedMovie(body);
    return res.data;
  }
);
// get movie details
export const getMovieDetails = createAsyncThunk(
  "movie/getMovieDetails",
  async (body) => {
    const res = await getMovieDetailsByID(body);
    return res.data;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // common reducer to set user states
    setUserState(state, action) {
      return {
        ...state,
        userData: action.payload.userData,
        loginStatus: action.payload.loginStatus,
      };
    },
  },
  extraReducers: {},
});
export const { setUserState } = userSlice.actions;
const { reducer } = userSlice;
export default reducer;
