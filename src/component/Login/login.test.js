import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import Login from "./index.js";
import { Provider } from "react-redux";
import "@testing-library/jest-dom";
import configureStore from "redux-mock-store";
describe("Login Component", () => {
  it("renders login form with input fields and button", () => {
    // Create a mock Redux store
    const mockStore = configureStore([]);
    const store = mockStore({
      // Your initial Redux store state here
    });

    // Render the Login component with the Provider and mock store
    const { getByPlaceholderText, getByText } = render(
      <Provider store={store}>
        <Login />
      </Provider>
    );

    // Your test assertions here
    waitFor(() => {
      expect(getByPlaceholderText("Enter Your Full Name")).toBeInTheDocument();
      expect(getByPlaceholderText("Enter Your Email")).toBeInTheDocument();
      expect(getByText("Login")).toBeInTheDocument();
    });
  });

  it("updates input values on user input", () => {
    const mockStore = configureStore([]);
    const store = mockStore({
      // Your initial Redux store state here
    });
    const { getByPlaceholderText } = render(
      <Provider store={store}>
        <Login />
      </Provider>
    );

    fireEvent.change(getByPlaceholderText("Enter Your Full Name"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(getByPlaceholderText("Enter Your Email"), {
      target: { value: "john.doe@example.com" },
    });
    fireEvent.change(getByPlaceholderText("Enter Your Contact"), {
      target: { value: "1234567890" },
    });
    fireEvent.change(getByPlaceholderText("Enter Your Password"), {
      target: { value: "password123" },
    });

    expect(getByPlaceholderText("Enter Your Full Name")).toHaveValue(
      "John Doe"
    );
    expect(getByPlaceholderText("Enter Your Email")).toHaveValue(
      "john.doe@example.com"
    );
    expect(getByPlaceholderText("Enter Your Contact")).toHaveValue(
      "1234567890"
    );
    expect(getByPlaceholderText("Enter Your Password")).toHaveValue(
      "password123"
    );
  });
});
