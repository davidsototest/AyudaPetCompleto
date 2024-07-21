import React from "react";
import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";
import PetsPublicationsPage from "../pages/PetsPublicationsPage";
import EducatePage from "../pages/EducatePage";
import ContactPage from "../pages/ContactPage";
import RecordUserPage from "../pages/RecordUserPage";
import SignInPage from "../pages/SingInPage";
import ProfilePage from "../pages/ProfilePage";
import LogoutPage from "../pages/LogoutPage";

export interface RouteItem {
  name: string;
  path: string;
  element: React.ComponentType<any>;
}

export const getRoutes = (token: string | null): RouteItem[] =>
  [
    { name: "Home", path: "/", element: HomePage },
    { name: "Quienes Somos", path: "/about", element: AboutPage },
    {
      name: "Mascotas Extraviadas",
      path: "/publications",
      element: PetsPublicationsPage,
    },
    { name: "Educación", path: "/educate", element: EducatePage },
    { name: "Contacto", path: "/contact", element: ContactPage },

    token
      ? { name: "Perfil", path: "/profile", element: ProfilePage }
      : { name: "Iniciar Sesión", path: "/signin", element: SignInPage },
    token
      ? { name: "Cerrar Sesión", path: "/logout", element: LogoutPage }
      : { name: "Registro", path: "/record", element: RecordUserPage },
  ].filter(Boolean) as RouteItem[];
