export const closeVariants = (rotate) => ({
  hidden: {
    rotate: 0,
  },
  show: {
    rotate: rotate,
    opacity: 1,
    transition: {
      duration: 0.4,
    },
  },
});

export const menuVariants = {
  closed: {
    height: 0,

    transition: {
      delay: 0.5,
      ease: "easeInOut",
    },
  },
  opened: {
    height: "100%",

    transition: {
      delay: 0.5,
      ease: "easeInOut",
    },
  },
  exit: {
    height: "0vh",

    transition: {
      delay: 0.4,
      ease: "easeInOut",
    },
  },
};

export const menuItemVariants = (delay) => ({
  closed: {
    y: "-50px",
    scale: 0.9,
    opacity: 0,
  },
  opened: {
    y: 0,
    scale: 1,
    opacity: 1,
    transition: {
      delay: 0.8 + delay,
    },
  },
  exit: {
    y: "-50px",
    scale: 0.9,
    opacity: 0,
    transition: {
      delay: 0.4 + delay * -1,
    },
  },
});
