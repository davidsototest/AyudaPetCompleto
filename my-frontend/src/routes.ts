import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import PetsPublicationsPage from "./pages/PetsPublicationsPage";
import EducatePage from "./pages/EducatePage";
import ContactPage from "./pages/ContactPage";
import RecordUserPage from "./pages/RecordUserPage";
import SignInPage from "./pages/SingInPage";

export interface RouteItem {
  name: string;
  path: string;
  element: React.ComponentType<any>; 
}

export const routes: RouteItem[] = [
  { name: "Home", path: "/", element: HomePage },
  { name: "Quienes Somos", path: "/about", element: AboutPage },
  { name: "Mascotas Extraviadas", path: "/publications",element: PetsPublicationsPage},
  { name: "Educación", path: "/educate", element: EducatePage },
  { name: "Contacto", path: "/contact", element: ContactPage },
  { name: "Registro", path: "/record", element: RecordUserPage },
  { name: "Iniciar Sesión", path: "/signin", element: SignInPage },
];
