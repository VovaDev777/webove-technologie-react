import { Route, Routes } from "react-router-dom";
import Layout from "../Layout/Layout";
import HomePage from "../../pages/HomePage/HomePage";
import PortfolioPage from "../../pages/PortfolioPage/PortfolioPage";

function App() {

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/portfolio" element={<PortfolioPage />}/>
      </Routes>
    </Layout>
  )
}

export default App
