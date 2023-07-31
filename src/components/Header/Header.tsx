import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useRealWorld } from "../../DataContext/Provider";

const Header = () => {
  const { state } = useRealWorld();
  const profile = state.user;
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          conduit
        </Link>
        <ul className="nav navbar-nav pull-xs-right">
          {state.isLogged ? (
            <>
              <li className="nav-item">
                <Link className={`nav-link ${currentPath === "/" ? "active" : ""}`} to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${currentPath === "/editor" ? "active" : ""}`} to="/editor/create">
                  {" "}
                  <i className="ion-compose"></i>&nbsp;New Article{" "}
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${currentPath === "/setting" ? "active" : ""}`} to="/setting">
                  {" "}
                  <i className="ion-gear-a"></i>&nbsp;Settings{" "}
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={`/profiles/${profile.username}`}>
                  <img src={profile.image} className="user-pic" />
                  {profile.username}
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link
                  className={`nav-link ${currentPath === "/" ? "active" : ""}`}
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    currentPath === "/login" ? "active" : ""
                  }`}
                  to="/login"
                >
                  Sign in
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    currentPath === "/register" ? "active" : ""
                  }`}
                  to="/register"
                >
                  Sign up
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Header;
