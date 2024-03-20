import { menuItemVariants, menuVariants } from "../../utils/motion";
import { AnimatePresence, motion } from "framer-motion";
import "./index.css";
import { NavLink } from "react-router-dom";

export const Menu = ({ expand, toggleExpand }) => {
  const navLinks = [
    {
      label: "OVERVIEW",
      pathname: "/",
      target: "",
    },
    {
      label: "INSIGHTS",
      pathname: "/insights",
      target: "",
    },
  ];
  return (
    <AnimatePresence>
      {expand && (
        <motion.div
          initial="closed"
          animate="opened"
          exit="exit"
          variants={menuVariants}
          className={"motion__container"}
        >
          <div className="motion">
            <div className="motion__item">
              {navLinks.map(({ label, pathname }, index) => {
                return (
                  <motion.div
                    key={index}
                    variants={menuItemVariants(index * 0.1)}
                    onClick={() => toggleExpand(false)}
                  >
                    <MenuItem label={label} pathname={pathname} />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const MenuItem = ({ label, pathname }) => {
  return (
    <NavLink to={pathname}>
      <h5 className="motion__text">{label}</h5>
    </NavLink>
  );
};
