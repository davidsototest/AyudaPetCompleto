

import React from 'react';

interface ButtonHeaderProps {
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

//isActive es true para mantener boton primario, usa un condicional
//pero es solo para el header, para que indique en pagina esta el user...


const ButtonHeader: React.FC<ButtonHeaderProps> = ({ isActive, onClick, children }) => {
  return (
    <button
      className={`button ${isActive ? 'button-secundary' : 'button-header'}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default ButtonHeader;
