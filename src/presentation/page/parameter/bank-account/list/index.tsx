import { Edit, Delete } from "@mui/icons-material"
import { Paper, Typography, List, ListItem, IconButton, ListItemText, Divider, useTheme } from "@mui/material"
import { alpha, Box } from "@mui/system"
import React from "react"

export const ListBankAccount : React.FC = () => {
    const theme = useTheme()
    return (
        <Paper
          sx={{
            background:
              theme.palette.mode == "dark"
                ? theme.palette.background.paper
                : theme.palette.background.default,
            padding: 2,
            borderRadius: 2,
            border: `1px solid ${alpha(theme.palette.text.secondary, 0.1)}`,
            "&:hover": {
              boxShadow: `0px 2px 14px 1px  ${alpha(
                theme.palette.primary.main,
                0.2
              )}`,
            },
          }}
        >
          <Box>
            <Paper
              sx={{
                boxShadow: "none",
                background:
                  theme.palette.mode == "dark"
                    ? alpha(theme.palette.background.default, 0.4)
                    : alpha(theme.palette.background.paper, 0.4),
                padding: 2,
                border: `1px solid ${alpha(theme.palette.text.secondary, 0.1)}`,
                borderRadius: 2,
                marginBottom: 2,
              }}
            >
              <Typography variant="caption" component="span">
                Registers
              </Typography>
            </Paper>
            <List>
              <ListItem
                secondaryAction={
                  <Box>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      sx={{
                        marginRight: 2,
                        color: theme.palette.text.secondary,
                      }}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton edge="end" aria-label="delete" color="error">
                      <Delete />
                    </IconButton>
                  </Box>
                }
              >
                <ListItemText primary="Single-line item" />
              </ListItem>
            </List>
            <Divider />
          </Box>
        </Paper>
    )
}