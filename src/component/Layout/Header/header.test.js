import React from "react";
import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import Header from "./index.js";
import configureStore from "redux-mock-store";
// Create a mock store
const mockStore = configureStore();
const store = mockStore({});

test("clicking the logout button redirects to home page (logged in state)", () => {
  const { getByText } = render(
    <Provider store={store}>
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    </Provider>
  );

  waitFor(() => {
    const logoutButton = getByText("Logout");
    userEvent.click(logoutButton);
    expect(history.push).toHaveBeenCalledWith("/");
  });

});
