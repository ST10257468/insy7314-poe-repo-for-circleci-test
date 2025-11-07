import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Register from "./pages/Register";
import Login from "./pages/Login";
import DashboardPage from "./pages/Dashboard";
import LogoutPage from "./pages/Logout";
import ProtectedRoute from "./components/ProtectedRoute";
import SecurityDemo from "./SecurityDemo";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route path="/logout" element={<LogoutPage />} />
          <Route path="/security-demo" elements={<SecurityDemo/>} />
          <Route path="/" element={<div>Home Page</div>} />
        </Routes>
      </Layout>
    </Router>
  );
  
}

export default App;
