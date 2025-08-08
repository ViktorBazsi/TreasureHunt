import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AuthProvider } from "./contexts/AuthContext";

import Header from "./components/Header";

// PAGES
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import TreasuresPage from "./pages/TreasurePage";
import CompanyPage from "./pages/CompanyPage";
import CompanyTreasuresPage from "./pages/CompanyTreasurePage";

function App() {
  return (
    <Router>
      <AuthProvider>
        <ToastContainer position="top-right" autoClose={3000} />
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/treasures" element={<TreasuresPage />} />
          <Route path="/companies" element={<CompanyPage />} />
          <Route
            path="/companies/:id/treasures"
            element={<CompanyTreasuresPage />}
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
