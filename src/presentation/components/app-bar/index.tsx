import React, { useContext } from "react";

import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Brightness1Outlined,
  Brightness1Rounded,
  Logout,
  NotificationsOutlined,
  Search,
  Settings,
  SettingsOutlined,
  Tune,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { useLocation } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  Chip,
  Divider,
  FormControl,
  InputAdornment,
  ListItemIcon,
  Menu,
  MenuItem,
  TextField,
  useTheme,
} from "@mui/material";
import { grey, yellow } from "@mui/material/colors";
import { ColorModeContext } from "../theme";

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBarCustom = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

interface Props {
  handleDrawerOpen: () => void;
  open: boolean;
}

export const AppBar: React.FC<Props> = ({ handleDrawerOpen, open }) => {
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const menuOpen = Boolean(anchorEl);

  const colorModeContext = useContext(ColorModeContext);

  return (
    <AppBarCustom
      position="fixed"
      open={open}
      sx={{
        backgroundColor: theme.palette.background.default,
        height: 84,
        backgroundImage: "none",
        border: "none",
        boxShadow: "none",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <IconButton
                data-testid="drawer-button-id"
                color="inherit"
                aria-label="drawer-button"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{
                  mr: 3,
                  ml: 2,
                  background: open
                    ? theme.palette.primary.main
                    : theme.palette.primary.light,
                  width: 29,
                  height: 29,
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "row",
                  ".MuiSvgIcon-root": {
                    fontSize: 21,
                    color: open
                      ? theme.palette.background.paper
                      : theme.palette.primary.main,
                  },
                  "&:hover": {
                    background: theme.palette.primary.main,
                    "& .MuiSvgIcon-root": {
                      color: theme.palette.background.paper,
                    },
                  },
                }}
              >
                <MenuIcon color="primary" />
              </IconButton>

              <IconButton
              data-testid="brightness-button-id"
              color="inherit"
              aria-label="brightness-button"
              edge="start"
              onClick={colorModeContext.toggleColorMode}
              sx={{
                mr: 3,
                background: theme.palette.primary.light,
                width: 29,
                height: 29,
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                ".MuiSvgIcon-root": {
                  fontSize: 21,
                },
                "&:hover": {
                  background: theme.palette.primary.main,
                  "& .MuiSvgIcon-root": {
                    color: theme.palette.background.paper,
                  },
                },
              }}
            >
              {theme.palette.mode === "dark" ? (
                <Brightness1Outlined color="primary" />
              ) : (
                <Brightness1Rounded color="primary" />
              )}
            </IconButton>
      </Toolbar>
    </AppBarCustom>
  );
};
