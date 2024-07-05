import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { routes } from "./routes";
import "toastify-js/src/toastify.css";
import { ThemeProvider } from "@mui/material";
import theme from "./theme/theme";
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";
// import Toastify from 'toastify-js'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div style={{marginBottom: "90px"}}>
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
        </Routes>
        
        <div style={{marginTop: "50px"}}>
        <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
