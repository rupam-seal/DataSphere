import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import "./index.css";
import Profile from "./Profile";
import { closeVariants } from "../../utils/motion";
import { useToggle } from "../../hooks/useToggle";
import { ToggleButton } from "../ToggleButton/ToggleButton";
import { Menu } from "../Menu/Menu";

export const Topbar = () => {
  const [title, setTitle] = useState();
  const location = useLocation();
  const { status: expand, toggleStatus: toggleExpand } = useToggle();

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
    <>
      <div className="topbar" style={{ boxShadow: expand && "none" }}>
        <div className="Welcome">
          {!expand && <div className="welcome__title">{title}</div>}
        </div>
        <Profile />
        <div className="hidden">
          <ToggleButton
            expand={expand}
            toggleStatus={toggleExpand}
            variants={closeVariants(expand ? 180 : -180)}
          />
        </div>
      </div>
      <Menu expand={expand} toggleExpand={toggleExpand} />
    </>
  );
};
