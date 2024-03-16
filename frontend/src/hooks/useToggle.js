import React, { useState } from 'react';

export const useToggle = () => {
  const [status, setStatus] = useState(true);

  const toggleStatus = () => setStatus((prevStatus) => !prevStatus);

  return { status, toggleStatus };
};
