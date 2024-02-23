import React, { useEffect } from "react";
import "./MovieDetailsModal.scss";
import CloseIcon from "../../../../assets/icons/close-circle.svg";
import MovieBanner from "../../../../assets/img/no-image.png";
import { useDispatch, useSelector } from "react-redux";
import { getMovieDetails, setMovieList } from "../../../Home/redux/reducer";
import moment from "moment";

export default function MovieDetailsModal() {
  const dispatch = useDispatch();
  // movies data taken from redux store
  const { movieId, movieDetails } = useSelector((state) => state.movies);

  useEffect(() => {
    // get movie details from api
    dispatch(getMovieDetails({ id: movieId }));
  }, [movieId]);

  return (
    <div className="movie-details-modal-alignment">
      <div className="movie-details-modal-wrapper">
        <div className="movie-details-modal-box-alignment">
          <div className="movie-details-heading-alignment">
            <h4>{movieDetails?.title}</h4>

            <div
              className="movie-details-close-icon"
              onClick={() =>
                // close movie details modal and reset movie details
                dispatch(
                  setMovieList({
                    movieId: "",
                    openMovieDetail: false,
                    movieDetails: {},
                  })
                )
              }
            >
              <img src={CloseIcon} alt="CloseIcon" />
            </div>
          </div>

          <div className="movie-details-modal-body-alignment">
            <div className="search-details-movie-details-img-alignment">
              <img
                src={movieDetails?.image ? movieDetails?.image : MovieBanner}
                alt="MovieBanner"
              />
            </div>

            <div className="search-movie-description-details-alignment">
              <h6>{movieDetails?.title}</h6>
              <p>{movieDetails?.overview}</p>

              <div className="search-movie-sub-details-alignment">
                <div className="sub-details-all-details-alignment">
                  <p>Genre</p>
                  <p>
                    {movieDetails?.genres?.map((attri, index) => {
                      return `${attri?.name}${
                        index === movieDetails?.genres?.length - 1 ? "" : ","
                      } `;
                    })}
                  </p>
                </div>

                <div className="sub-details-all-details-alignment">
                  <p>Im Db Rating</p>
                  <p>{movieDetails?.voteAverage}</p>
                </div>
                <div className="sub-details-all-details-alignment">
                  <p>Im Db Rating Votes</p>
                  <p>{movieDetails?.voteCount}</p>
                </div>

                <div className="sub-details-all-details-alignment">
                  <p>Release Year</p>
                  <p>{moment(movieDetails?.release_date).format("YYYY")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
