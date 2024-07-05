
import React from 'react';

interface ButtonPrimaryProps {
  onClick: () => void;
  children: React.ReactNode;
}

const ButtonPrimary: React.FC<ButtonPrimaryProps> = ({ onClick, children }) => {
  return (
    <button
      className="button button-primary"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default ButtonPrimary;
