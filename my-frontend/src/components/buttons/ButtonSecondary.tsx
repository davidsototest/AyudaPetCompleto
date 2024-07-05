

import React from 'react';

interface ButtonSecondaryProps {
  onClick: () => void;
  children: React.ReactNode;
}

const ButtonSecondary: React.FC<ButtonSecondaryProps> = ({ onClick, children }) => {
  return (
    <button
      className="button button-secundary"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default ButtonSecondary;
