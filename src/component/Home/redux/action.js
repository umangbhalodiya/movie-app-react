import { API_KEY } from '../../../config';
import api from '../../../utils/api';


export const getMovieData = () => api.get(`movie/popular?api_key=${API_KEY}`);

export const getTopMovie = () => api.get(`TopRated?Page=1&Language=en-US`);

export const getSerchedMovie = (body) => api.get(`Search?Content=${body?.title}&Page=${body?.page}&Language=en-US&Adult=false`);

export const getMovieDetailsByID = (body) => api.get(`Detail?Items=${body?.id}&Language=en-US`);



