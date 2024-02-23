import React from "react";
import "./MovieList.scss";
import MovieBanner from "../../../../assets/img/no-image.png";
import { useDispatch } from "react-redux";
import { setMovieList } from "../../redux/reducer";
import NoSearchData from "../NoSearchData/index";
import Skeleton from "react-loading-skeleton";

export default function MovieList(props) {
  const { totalResults, loading, latestMovies } = props;
  const dispatch = useDispatch();
  // open movie details modal
  const handleOpenDetail = (data) => {
    // set movie details to redux store
    let movie = {
      ...data,
      genres: data?.genres
        ?.map((attri, index) => {
          return { name: attri };
        })
        ?.reverse(),
    };
    // open movie details modal with redux stored data
    // object has been stored to redux so that until the response come from api, we can show the data from redux store
    dispatch(
      setMovieList({
        movieDetails: movie,
        movieId: data.id,
        openMovieDetail: true,
      })
    );
  };

  return (
    <div className="search-page-section">
      <div className="simillar-details-section">
        <div className="container">
          <h4>Search Results</h4>

          <div className="simillar-details-alignment">
            {totalResults > 0 ? (
              loading ? (
                <div className="simillar-details-grid">
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]?.map((item, i) => {
                    return (
                      <Skeleton key={i} duration={1} height={375} width={240} />
                    );
                  })}
                </div>
              ) : (
                <>
                  <div className="simillar-details-grid">
                    {latestMovies?.map((movie, i) => {
                      return (
                        <div
                          className="simillar-details-gridItem"
                          key={i}
                          onClick={() => {
                            // open movie details modal
                            handleOpenDetail(movie);
                          }}
                        >
                          <div className="simillar-movie-details-box-alignment">
                            <img
                              src={
                                movie?.image ? `${movie?.image}` : MovieBanner
                              }
                              alt="MovieBanner"
                            />

                            <div className="movie-like-alignment">
                              <p>IMDB Ratings :- {movie?.voteAverage}</p>
                            </div>
                          </div>

                          <div className="movie-name-alignment">
                            <h6>{movie?.title}</h6>
                            <p>{movie?.genres}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              )
            ) : (
              <NoSearchData />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
