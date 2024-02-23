import { configureStore } from "@reduxjs/toolkit";

import moviesReducer from "../component/Home/redux/reducer";
import userReducer from "../component/Home/redux/userReducer";

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    user: userReducer,
  },
});
