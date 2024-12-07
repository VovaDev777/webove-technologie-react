import { Route, Routes } from "react-router-dom";
import Layout from "../Layout/Layout";
import HomePage from "../../pages/HomePage/HomePage";
import PortfolioPage from "../../pages/PortfolioPage/PortfolioPage";
import SummaryPage from "../../pages/Summary/SummaryPage";
import RegisterPage from "../../pages/RegisterPage/RegisterPage";
import LoginPage from "../../pages/LoginPage/LoginPage";
import { AuthProvider } from '../AuthContext/AuthContext'; // Импорт AuthProvider
import AllUsersPage from "../../pages/AllUsersPage/AllUsersPage";

function App() {
  return (
    <AuthProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/summary" element={<SummaryPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/allUsers" element={<AllUsersPage />} />
        </Routes>
      </Layout>
    </AuthProvider>
  );
}

export default App;
