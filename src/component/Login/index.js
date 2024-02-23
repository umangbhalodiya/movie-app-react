import React, { useState } from "react";
import "./Login.scss";
import { useDispatch } from "react-redux";
import { setUserState } from "../Home/redux/userReducer";
import { useHistory } from "react-router-dom";
import toast from "react-hot-toast";

export default function Login() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [inputs, setInputs] = useState({});

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const functionLogin = () => {
    toast.success("Login Successfully");
    localStorage.setItem(
      "userData",
      JSON.stringify({ ...inputs, loginStatus: true })
    );
    dispatch(setUserState({ userData: inputs, loginStatus: true }));
    history.push("/");
  };
  return (
    <div className="login-section">
      <div className="login-box-alignment">
        <div className="login-heading-alignment">
          <h4>Login</h4>
        </div>
        <div className="login-input-alignment">
          <input
            type="text"
            placeholder="Enter Your Full Name"
            name="fullName"
            onChange={(e) => {
              handleInputs(e);
            }}
          />
        </div>
        <div className="login-input-alignment">
          <input
            type="email"
            placeholder="Enter Your Email"
            name="firstName"
            onChange={(e) => {
              handleInputs(e);
            }}
          />
        </div>{" "}
        <div className="login-input-alignment">
          <input
            type="text"
            placeholder="Enter Your Contact"
            name="contact"
            onChange={(e) => {
              handleInputs(e);
            }}
          />
        </div>
        <div className="login-input-alignment">
          <input
            type="password"
            placeholder="Enter Your Password"
            name="password"
            onChange={(e) => {
              handleInputs(e);
            }}
          />
        </div>
        <div className="login-button">
          <button
            onClick={() => {
              functionLogin();
            }}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
