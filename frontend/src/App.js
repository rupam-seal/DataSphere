import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Create from "./pages/Create";
import { Sidebar } from "./components/sidebar";
import { Topbar } from "./components/topbar";
import { Insights } from "./pages/Insights";
import GlobalProvider from "./contexts/GlobalProvider";
import { Overview } from "./pages/overview";
import { Filler } from "chart.js";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  BarElement,
  ArcElement
);

const App = () => {
  return (
    <React.StrictMode>
      <GlobalProvider>
        <BrowserRouter>
          <Sidebar />
          <Topbar />
          <Routes>
            <Route path="/" element={<Overview />} exact />
            <Route path="/insights" element={<Insights />} exact />
            <Route path="/admin" element={<RedirectToExternalWebsite />} />
          </Routes>
        </BrowserRouter>
      </GlobalProvider>
    </React.StrictMode>
  );
};

const RedirectToExternalWebsite = () => {
  window.location.href = "https://datasphere-admin.vercel.app";
  return null;
};

export default App;
