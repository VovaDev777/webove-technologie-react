import { Route, Routes } from "react-router-dom";
import Layout from "../Layout/Layout";
import HomePage from "../../pages/HomePage/HomePage";
import PortfolioPage from "../../pages/PortfolioPage/PortfolioPage";
import SummaryPage from "../../pages/Summary/SummaryPage";

function App() {

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/portfolio" element={<PortfolioPage />}/>
        <Route path="/summary" element={<SummaryPage />}/>
        <Route path="/register" element{}></Route>
        <Route path="/login"></Route>
      </Routes>
    </Layout>
  )
}

export default App
