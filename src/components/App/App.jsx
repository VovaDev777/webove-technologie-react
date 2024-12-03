import { Route, Routes } from "react-router-dom";
import Layout from "../Layout/Layout";
import HomePage from "../../pages/HomePage/HomePage";
import PortfolioPage from "../../pages/PortfolioPage/PortfolioPage";
import SummaryPage from "../../pages/Summary/SummaryPage";
import RegisterPage from "../../pages/RegisterPage/RegisterPage";
import LoginPage from "../../pages/LoginPage/LoginPage";

function App() {

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/portfolio" element={<PortfolioPage />}/>
        <Route path="/summary" element={<SummaryPage />}/>
        <Route path="/register" element={<RegisterPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
      </Routes>
    </Layout>
  )
}

export default App
