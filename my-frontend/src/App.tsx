import React, { useMemo } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { getRoutes } from "./route/routes";
import "toastify-js/src/toastify.css";
import { ThemeProvider } from "@mui/material";
import theme from "./theme/theme";
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";
import { AuthProvider, useAuth } from "./context/AuthContext";
import PrivateRoute from "./route/PrivateRoute";
import AcountPage from "./pages/AcountPage";

function App() {
  const { token } = useAuth();
  
  // Usa useMemo para recalcular las rutas solo cuando token cambie
  const routes = useMemo(() => getRoutes(token), [token]);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div style={{ marginBottom: "90px" }}>
          <Header />
        </div>
        <Routes>
          {routes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<route.element />}
            />
          ))}
          <Route
            path="/acount"
            element={<PrivateRoute element={<AcountPage />} />}
          />
        </Routes>

        <div style={{ marginTop: "50px" }}>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
