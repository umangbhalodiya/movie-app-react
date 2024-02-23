import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import RequestStates from "../../../utils/request-states";

import {
  getMovieData,
  getMovieDetailsByID,
  getSerchedMovie,
  getTopMovie,
} from "./action";
// initial states for movie
const initialState = {
  movieRequestState: RequestStates.init,
  movieId: "",
  openMovieDetail: false,
  movieDetails: {},
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
// movie slice
const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    // common reducer to set movie  states
    setMovieList(state, action) {
      return {
        ...state,
        movieId: action.payload.movieId,
        openMovieDetail: action.payload.openMovieDetail,
        movieDetails: action.payload.movieDetails,
      };
    },
  },
  //apis response handling
  extraReducers: {
    [getPopularMovieData.fulfilled]: (state, action) => ({
      ...state,
      movieRequestState: RequestStates.success,
    }),
    [getPopularMovieData.pending]: (state) => ({
      ...state,
      movieRequestState: RequestStates.loading,
    }),
    [getPopularMovieData.rejected]: (state) => ({
      ...state,
      movieRequestState: RequestStates.error,
    }),
    [getTopMovieData.fulfilled]: (state, action) => ({
      ...state,
      movieRequestState: RequestStates.success,
    }),
    [getTopMovieData.pending]: (state) => ({
      ...state,
      movieRequestState: RequestStates.loading,
    }),
    [getTopMovieData.rejected]: (state) => ({
      ...state,
      movieRequestState: RequestStates.error,
    }),
    [getSerchedMovieData.fulfilled]: (state, action) => ({
      ...state,
      movieRequestState: RequestStates.success,
    }),
    [getSerchedMovieData.pending]: (state) => ({
      ...state,
      movieRequestState: RequestStates.loading,
    }),
    [getSerchedMovieData.rejected]: (state) => ({
      ...state,
      movieRequestState: RequestStates.error,
    }),
    [getMovieDetails.fulfilled]: (state, action) => ({
      ...state,
      movieRequestState: RequestStates.success,
      movieDetails: action.payload[0],
    }),
    [getMovieDetails.pending]: (state) => ({
      ...state,
      movieRequestState: RequestStates.loading,
    }),
    [getMovieDetails.rejected]: (state) => ({
      ...state,
      movieRequestState: RequestStates.error,
    }),
  },
});

// exporting the actions
export const { setMovieList } = movieSlice.actions;
const { reducer } = movieSlice;
export default reducer;
