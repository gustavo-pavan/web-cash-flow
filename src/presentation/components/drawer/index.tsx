import React from "react";
import DrawerMui from "@mui/material/Drawer";
import { styled } from "@mui/material/styles";
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, useTheme } from "@mui/material";
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

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
          background: theme.palette.primary.dark,
        },
      }}
      anchor="left"
      open={open}
      color={theme.palette.background.paper}
    >
      <>
        <DrawerHeader />
        <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      </>
    </DrawerMui>
  );
};
