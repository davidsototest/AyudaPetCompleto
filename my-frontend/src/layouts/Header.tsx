import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import PetsIcon from "@mui/icons-material/Pets";
import { getRoutes, RouteItem } from "../route/routes";
import ButtonHeader from "../components/buttons/ButtonHeader";
import { useAuth } from "../context/AuthContext";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const navigate = useNavigate();
  const location = useLocation();

  //valido si tengo algun usuario activo para cambiar los botones
  const { token } = useAuth();
  const routes = getRoutes(token);
  const routesDesktop = [...routes].reverse();

  const handleNavigate = (path: string) => {
    navigate(path);
    setAnchorElNav(null);
  };

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "rgba(36, 27, 53, 0.95)",
        borderRadius: "0% 0% 20px 20px",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Desktop  */}
          <PetsIcon sx={{ display: { xs: "none", md: "flex" }, mr: 2 }} />
          <Typography
            variant="h1"
            noWrap
            component="a"
            href="/"
            sx={{
              fontSize: 40,
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontWeight: 700,
              letterSpacing: ".2rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            AyudaPet
          </Typography>

          {/* //mobile */}
          <PetsIcon sx={{ display: { xs: "flex", md: "none" }, mr: 2 }} />
          <Typography
            variant="h1"
            noWrap
            component="a"
            href="/"
            sx={{
              fontSize: 30,
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            AyudaPet
          </Typography>

          {/* MOBILE  */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
              flexDirection: "row-reverse",
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
                background: "rgba(36, 27, 53, 0.5)",
              }}
            >
              {routes.map((route: RouteItem) => (
                <MenuItem
                  key={route.path}
                  onClick={() => handleNavigate(route.path)}
                  // sx={{background: 'rgba(36, 27, 53, 0.95)'}}
                >
                  <Typography textAlign="center" variant="h5" padding={2}>
                    {route.name}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Desktop  */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              flexDirection: "row-reverse",
            }}
          >
            {routesDesktop.map((route: RouteItem) => (
              <ButtonHeader
                key={route.path}
                isActive={location.pathname === route.path}
                onClick={() => handleNavigate(route.path)}
              >
                {route.name}
              </ButtonHeader>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
