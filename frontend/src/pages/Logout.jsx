/*
ATTRIBUTES:
  Website:SecureBlog Activity
  Author: talia0404
  URL: https://github.com/talia0404/INSY7314/tree/main/SecureBlog%20Activity
  Accessed on: 2025-09-29

  Website: Learn React – A Handbook for Beginners
  Author: Nathan Sebhastian
  URL: https://www.freecodecamp.org/news/react-for-beginners-handbook/
  Accessed on: 2025-10-01

  Website: Basic Registration and Login Form Using React Hook Form
  Author: Geeks for Geeks
  URL: https://www.geeksforgeeks.org/reactjs/react-hook-form-create-basic-reactjs-registration-and-login-form/
  Accessed on: 2025-10-09
*/

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("token");
    navigate("/", { replace: true });
  }, [navigate]);

  return null; // optional: show a "Logging out..." message
};

export default Logout;
