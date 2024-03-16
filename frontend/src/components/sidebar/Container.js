import React from 'react';

const Container = ({ title, children }) => {
  return (
    <div className="container">
      <div className="container__title">{title}</div>
      <div className="container__list">{children}</div>
    </div>
  );
};

export default Container;
