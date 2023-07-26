    import React from "react";
    import { Link, useLocation } from "react-router-dom";

    const Header = () => {
        const location = useLocation();
        const currentPath = location.pathname; 
        return (
        <nav className="navbar navbar-light">
        <div className="container">
            <Link className="navbar-brand" to="/">
            conduit
            </Link>
            <ul className="nav navbar-nav pull-xs-right">
            <li className="nav-item">
                <Link className={`nav-link ${currentPath === "/" ? "active" : ""}`} to="/">
                Home
                </Link>
            </li>
            <li className="nav-item">
                <Link className={`nav-link ${currentPath === "/login" ? "active" : ""}`} to="/login">
                Sign in
                </Link>
            </li>
            <li className="nav-item">
                <Link className={`nav-link ${currentPath === "/register" ? "active" : ""}`} to="/register">
                Sign up
                </Link>
            </li>
            </ul>
        </div>
        </nav>
    );
    };

    export default Header;
