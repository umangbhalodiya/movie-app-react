import React from "react";
import "./Header.scss";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
  const history = useHistory();
  const isLogin = JSON.parse(localStorage.getItem("userData"));
  const handleLogout = () => {
    localStorage.removeItem("userData");
    history.push("/login");
  };
  return (
    <div className="header-section">
      <div className="container">
        <div className="header-alignment">
          <div
            className="header-logo-alignment"
            onClick={() => history.push("/")}
          >
            MOVIE FINDER
          </div>

          <div className="header-option-alignment">
            {isLogin ? (
              <div className="btn-logout">
                <button onClick={() => handleLogout()}>Logout</button>
              </div>
            ) : (
              <ul>
                <li>
                  <div
                    className="user-icon-alignment"
                    onClick={() => history.push("/login")}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="1em"
                      viewBox="0 0 448 512"
                    >
                      <path
                        d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z "
                        fill="#fff"
                      />
                    </svg>
                  </div>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
