import React from "react";
import Container from "./Container";
import { BsGrid } from "react-icons/bs";
import { CgExtensionAdd } from "react-icons/cg";
import { MdOutlineInsights } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { MdDataSaverOff } from "react-icons/md";
import { HiOutlineLogout } from "react-icons/hi";

import "./index.css";
import { useGlobalContext } from "../../contexts/GlobalProvider";

export const Sidebar = () => {
  const { topInsights, sectors } = useGlobalContext();
  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <div className="top">
          <div className="logo">
            <MdDataSaverOff />
            <span>
              Data<span>Sphere.</span>
            </span>
          </div>
        </div>
        <div className="sidebar__content">
          <Container title={"overview"}>
            <div>
              <MenuItem icon={<BsGrid />} title={"Overview"} />
              <MenuItem icon={<CgExtensionAdd />} title={"Create"} />
              <MenuItem icon={<MdOutlineInsights />} title={"Insights"} />
            </div>
          </Container>
          <Container title={"Top Insigths"}>
            <TopInsights topInsights={topInsights} />
          </Container>
          <Container title={"Sectors"}>
            <SectorList>{sectors}</SectorList>
          </Container>
        </div>
      </div>
      <div className="sidebar__bottom">
        <div className="logout">
          <HiOutlineLogout />
          <span className="logout__txt">Logout</span>
        </div>
      </div>
    </div>
  );
};

export const MenuItem = ({ icon, title }) => {
  const name = title.toLowerCase();
  return (
    <NavLink to={name === "overview" ? "/" : `/${name}`}>
      <div className="menu">
        {icon}
        <h5 className="menu__text">{title}</h5>
      </div>
    </NavLink>
  );
};

export const TopInsights = ({ topInsights }) => {
  const sliceStr = (str) => {
    return str.split("", 23).join("");
  };

  if (!topInsights.length) {
    return <SectorShimmer count={3} />;
  }

  return (
    <>
      {topInsights.slice(0, 3).map((insight, index) => {
        return (
          <div className="insight" key={index}>
            <div className="insight__dot"></div>
            <h5 className="insight__txt">
              {sliceStr(insight.title)}
              {insight.title.length > 30 ? "..." : ""}
            </h5>
          </div>
        );
      })}
    </>
  );
};

export const SectorList = ({ children }) => {
  if (children.length === 0) {
    return <SectorShimmer count={6} />;
  }
  return (
    <div>
      {children.map((sector, id) => {
        return sector !== "" && <SectorItem key={id}>{sector}</SectorItem>;
      })}
    </div>
  );
};

export const SectorItem = ({ children }) => {
  return <div className="sector">{children}</div>;
};

export const SectorShimmer = ({ count }) => {
  return (
    <>
      {[...Array(count)].map((_, index) => (
        <div className="insight__item_shimmer insight" key={index}>
          <div className="insight__dot_shimmer"></div>
          <h5 className="insight__txt">{""}</h5>
        </div>
      ))}
    </>
  );
};
