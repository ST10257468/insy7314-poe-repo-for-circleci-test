import { Link } from "react-router-dom";
import "./Layout.css";

const isLoggedIn = () => !!localStorage.getItem("token");

const Layout = ({ children }) => {
  return (
    <>
      <nav className="nav-bar">
        <Link className="nav-btn" to="/">Home</Link>
        {isLoggedIn() ? (
          <>
            <Link className="nav-btn" to="/dashboard">Dashboard</Link>
            <Link className="nav-btn" to="/logout">Logout</Link>
          </>
        ) : (
          <>
            <Link className="nav-btn" to="/register">Register</Link>
            <Link className="nav-btn" to="/login">Login</Link>
          </>
        )}
      </nav>
      <main>{children}</main>
    </>
  );
};

export default Layout;
