import React from "react";

import { IoIosArrowDown } from "react-icons/io";

const Profile = () => {
  return (
    <div className="profile">
      <div className="profile__img">
        <img
          src={
            "https://plus.unsplash.com/premium_photo-1689977968861-9c91dbb16049?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          alt=""
        ></img>
      </div>
      <div className="profile__info">
        <h5 className="profile__name">Michael Williams</h5>
        <h5 className="profile__email">michael.w@gmail.com</h5>
      </div>

      <div className="profile__option">
        <IoIosArrowDown />
      </div>
    </div>
  );
};

export default Profile;
