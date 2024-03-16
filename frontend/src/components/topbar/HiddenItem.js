import React from 'react';

import { FiSearch } from 'react-icons/fi';
import { HiMenu } from 'react-icons/hi';

const HiddenItem = () => {
  return (
    <div className="hidden">
      <HiddenSearch>
        <FiSearch />
      </HiddenSearch>
      <HiddenMenu>
        <HiMenu />
      </HiddenMenu>
    </div>
  );
};

export const HiddenSearch = ({ children }) => {
  return <div className="hidden__search">{children}</div>;
};

export const HiddenMenu = ({ children }) => {
  return <div className="hidden__menu">{children}</div>;
};

export default HiddenItem;
