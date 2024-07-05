

//hook para el autoscroll al top de cada pagina, en cada cambio de path

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const ScrollToTopOnPageChange = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};
