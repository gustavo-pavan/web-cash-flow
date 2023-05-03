import React from "react";
import DrawerMui from "@mui/material/Drawer";
import { styled } from "@mui/material/styles";
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import { Settings, Home } from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";

const drawerWidth = 240;

export const DrawerHeader = styled("div")(({ theme }) => ({
  minHeight: 84,
  maxHeight: 84,
  border: "none",
}));

interface Props {
  open: boolean;
}

export const Drawer: React.FC<Props> = ({ open }) => {
  const theme = useTheme();
  const location = useLocation();

  let routes = new Array<string>();

  for (let i = 0; i < menus.length; i++)
    routes.push(...menus[i].links.map((x) => x.path));

  const regex = /(\/[a-zA-z-_]+)|(\/)/g;
  const route = regex.exec(location.pathname)[0];

  return (
    <DrawerMui
      variant="persistent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          border: "none",
          background: theme.palette.background.default,
        },
      }}
      anchor="left"
      open={open}
      color={theme.palette.background.paper}
    >
      <>
        <DrawerHeader />
        {menus.map((menu) => (
          <React.Fragment key={menu.title}>
            <Box
              sx={{
                pl: "17px",
              }}
            >
              <Typography
                variant="h6"
                component="span"
                sx={{
                  fontSize: "1em",
                }}
              >
                {menu.title}
              </Typography>
            </Box>
            <List sx={{ pl: "20px" }}>
              {menu.links.map((link, index) => (
                <ListItem key={link.label} disablePadding>
                  <ListItemButton
                    sx={{
                      borderRadius: "8px",
                      color:
                        route == link.path
                          ? theme.palette.primary.main
                          : theme.palette.text.primary,
                      mb: "5px",
                      "&:hover": {
                        background: theme.palette.primary.light,
                      },
                    }}
                    component={Link}
                    to={link.path}
                    selected={route === link?.path}
                  >
                    <ListItemIcon
                      sx={{
                        color:
                          route == link.path
                            ? theme.palette.primary.main
                            : theme.palette.text.primary,
                      }}
                    >
                      {link.icon}
                    </ListItemIcon>
                    <ListItemText primary={link.label} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
            <Divider
              sx={{
                mb: "12px",
              }}
            />
          </React.Fragment>
        ))}
      </>
    </DrawerMui>
  );
};

const menus = [
  {
    title: "Home",
    links: [
      {
        path: "/",
        icon: <Home />,
        label: "Home",
      },
    ],
  },
  {
    title: "Parâmetros",
    links: [
      {
        path: "/parameters",
        icon: <Settings />,
        label: "Parâmetros",
      },
    ],
  },
];
