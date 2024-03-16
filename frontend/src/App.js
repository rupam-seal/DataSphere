import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Create from "./pages/Create";
import Insights from "./pages/Insights";
import { Sidebar } from "./components/sidebar";
import { Topbar } from "./components/topbar";
import GlobalProvider from "./contexts/GlobalProvider";
import { Overview } from "./pages/overview";

const App = () => {
  return (
    <React.StrictMode>
      <GlobalProvider>
        <BrowserRouter>
          <Sidebar />
          <Topbar />
          <Routes>
            <Route path="/" element={<Overview />} exact />
            <Route path="/create" element={<Create />} exact />
            <Route path="/insights" element={<Insights />} exact />
          </Routes>
        </BrowserRouter>
      </GlobalProvider>
    </React.StrictMode>
  );
};

export default App;
