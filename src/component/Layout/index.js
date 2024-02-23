import React from "react";
import {
  BrowserRouter,
  Redirect,
  Route,
  Switch,
  useLocation,
} from "react-router-dom";
import Home from "../Home";
import Header from "./Header";
import Login from "../Login";

const DefaultLayout = ({ children }) => (
  <>
    <Header />
    {children}
  </>
);

const SecondLayout = ({ children }) => <>{children}</>;

function Layout() {
  return (
    <BrowserRouter>
      <Switch>
        <RouteWrapper
          exact={true}
          path="/login"
          component={Login}
          layout={SecondLayout}
        />
        <RouteWrapper
          exact={true}
          path="/"
          component={Home}
          layout={DefaultLayout}
        />
      </Switch>
    </BrowserRouter>
  );
}

function RouteWrapper({ component: Component, layout: Layout, auth, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => (
        <Layout {...props}>
          <Component {...props} />{" "}
        </Layout>
      )}
    />
  );
}
export default Layout;
