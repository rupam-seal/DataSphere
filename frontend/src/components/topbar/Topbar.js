import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import "./index.css";
import Profile from "./Profile";
import HiddenItem from "./HiddenItem";

export const Topbar = () => {
  const [title, setTitle] = useState();
  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case "/":
        setTitle("Insights Overview");
        break;
      case "/create":
        setTitle("Create");
        break;
      case "/insights":
        setTitle("Insights Item");
        break;
      default:
        setTitle("");
        break;
    }
  }, [location.pathname, setTitle]);

  return (
    <div className="topbar">
      <div className="Welcome">
        <div className="welcome__title">{title}</div>
      </div>
      <Profile />
      <HiddenItem />
    </div>
  );
};
