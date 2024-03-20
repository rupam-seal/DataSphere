import { motion } from "framer-motion";
import { CgClose } from "react-icons/cg";
import { HiMenuAlt4 } from "react-icons/hi";
import "./index.css";

export const ToggleButton = ({ toggleStatus, variants, expand }) => {
  return (
    <div
      className={"toggle__container"}
      viewport={{ once: true, amount: 0.25 }}
      onClick={toggleStatus}
    >
      <motion.div
        className={"toggle__icon"}
        variants={variants}
        initial="hidden"
        animate="show"
        exit="hidden"
      >
        {expand ? <CgClose /> : <HiMenuAlt4 />}
      </motion.div>
    </div>
  );
};
