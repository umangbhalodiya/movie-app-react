import React, { useEffect, useState } from "react";
import "./Home.scss";
import MovieDetailsModal from "../Home/components/MovieDetailsModal";
import { useDispatch, useSelector } from "react-redux";
import { getSerchedMovieData, getTopMovieData } from "./redux/reducer";
import { useHistory } from "react-router-dom";
import { urlSearchParams } from "../../utils";
import { toast } from "react-hot-toast";
import MovieList from "./components/MovieList";

export default function Home() {
  const dispatch = useDispatch();
  const history = useHistory();
  const search = urlSearchParams("search");
  const openMovieDetail = useSelector((state) => state.movies.openMovieDetail);
  const [searchMovies, setSearchMovies] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPages, setCurrentPages] = useState(1);
  const [totalResults, setTotalResults] = useState(1);
  const [latestMovies, setLatestMovies] = useState([]);

  useEffect(() => {
    // get movie data based on search and popular
    if (search) {
      setSearchMovies(search);
      getSerchedMovie();
    } else {
      setSearchMovies("");
      getMostPopularMovies();
    }

    //setting dipendancy for search and currentPages
  }, [search, currentPages]);

  useEffect(() => {
    // disable scroll when movie details modal is open
    if (openMovieDetail) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [openMovieDetail]);

  // get searched movie data
  const getSerchedMovie = async () => {
    try {
      setLoading(true);
      // get searched movie data
      dispatch(getSerchedMovieData({ page: currentPages, title: search }))
        .then((response) => {
          if (response?.meta?.requestStatus === "fulfilled") {
            const movies = response?.payload;
            // set movie data to state
            setLatestMovies(movies);
            setTotalResults(movies?.length);
          }
          setLoading(false);
        })
        .catch((error) => {
          toast.error(error);
          setLoading(false);
        });
    } catch (err) {
      toast.error(err);
    }
  };

  // get most popular movies
  const getMostPopularMovies = async () => {
    try {
      setLoading(true);
      // get top movie data
      dispatch(getTopMovieData())
        .then((response) => {
          console.log("responseresponse", response);
          if (response?.meta?.requestStatus === "fulfilled") {
            const movies = response?.payload;
            // set movie data to state
            setLatestMovies(movies);
            setTotalResults(movies?.length);
          }
          setLoading(false);
        })
        .catch((error) => {
          toast.error(error);
          setLoading(false);
        });
    } catch (err) {
      toast.error(err);
    }
  };

  const HandleMovieSearch = () => {
    setCurrentPages(1);
    // get movie data based on search
    if (searchMovies) {
      history.push(`/?search=${searchMovies}`);
    } else {
      history.push(`/`);
    }
  };

  const handleOnKeyPressSubmit = (e) => {
    if (e.key === "Enter" && searchMovies) {
      history.push(`/?search=${searchMovies}`);
      setCurrentPages(1);
    }
  };

  const handleSerchData = (e) => {
    // set search input
    history.push(`/`);
    setSearchMovies(e.target.value);
  };
  return (
    <>
      <div className="home-section">
        <div className="home-alignment">
          <div className="search-sticky-alignment">
            <div className="new-search-alignment">
              <input
                type="text"
                value={searchMovies}
                onKeyPress={(e) => handleOnKeyPressSubmit(e)}
                onChange={(e) => {
                  e.target.value === ""
                    ? handleSerchData(e)
                    : setSearchMovies(e.target.value);
                }}
                placeholder="Search movie by name..."
              />
              <div className="new-search-icon-alignment">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 512 512"
                >
                  <path
                    d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"
                    fill="#fff"
                  />
                </svg>
              </div>
              {searchMovies && (
                <a onClick={() => HandleMovieSearch()}>Search</a>
              )}
            </div>
          </div>
          <MovieList
            latestMovies={latestMovies}
            totalResults={totalResults}
            loading={loading}
          />
        </div>
      </div>
      {openMovieDetail && <MovieDetailsModal />}
    </>
  );
}
