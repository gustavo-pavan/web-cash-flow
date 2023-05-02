import React from "react";
import { Container } from "../../container";
import {
  Box,
  Button,
  Divider,
  Grid,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  alpha,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Input } from "../../components/input";
import { FileDownload, Add } from "@mui/icons-material";
import { Form } from "./components/form";
import { TableFlow } from "./components/table";

export const Home: React.FC = () => {
  const theme = useTheme();

  return (
    <Box>
      <Paper
        elevation={1}
        sx={{
          paddingBottom: 2,
          background:
            theme.palette.mode == "dark"
              ? theme.palette.background.paper
              : theme.palette.background.default,
        }}
      >
        <Box
          sx={{
            padding: 2,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6" component="span">
            Cash Flow
          </Typography>

          <Button variant="contained" size="small" startIcon={<FileDownload />}>
            Export
          </Button>
        </Box>
        <Divider />

        <Form />

        <Divider />
        <TableFlow />
        
        <Divider />

        <Paper
          sx={{
            padding: 2,
            background:
              theme.palette.mode == "dark"
                ? theme.palette.background.paper
                : theme.palette.background.default,
          }}
        >
          <Box
            sx={{
              backgroundImage: "none",
              border: `1px solid ${alpha(theme.palette.text.secondary, 0.2)}`,
              backgroundColor: alpha(theme.palette.background.paper, 0.5),
              padding: 2,
              borderRadius: "8px",
              display: "flex",
              alignItems: "end",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                width: "25%",
              }}
            >
              <Box sx={{ width: "100%" }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "end",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "45%",
                    }}
                  >
                    <Typography
                      variant="body2"
                      component="span"
                      sx={{
                        color: alpha(theme.palette.text.secondary, 0.7),
                      }}
                    >
                      Sub Total
                    </Typography>
                    <Typography
                      variant="body2"
                      component="span"
                      sx={{
                        color: alpha(theme.palette.text.secondary, 0.7),
                      }}
                    >
                      $20.00
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "45%",
                    }}
                  >
                    <Typography
                      variant="body2"
                      component="span"
                      sx={{
                        color: alpha(theme.palette.text.secondary, 0.7),
                      }}
                    >
                      Debit
                    </Typography>
                    <Typography
                      variant="body2"
                      component="span"
                      sx={{
                        color: alpha(theme.palette.text.secondary, 0.7),
                      }}
                    >
                      $20.00
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "45%",
                    }}
                  >
                    <Typography
                      variant="body2"
                      component="span"
                      sx={{
                        color: alpha(theme.palette.text.secondary, 0.7),
                      }}
                    >
                      Credit
                    </Typography>
                    <Typography
                      variant="body2"
                      component="span"
                      sx={{
                        color: alpha(theme.palette.text.secondary, 0.7),
                      }}
                    >
                      $20.00
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Divider />
              <Box sx={{ width: "100%", mt: 1 }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "end",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "45%",
                    }}
                  >
                    <Typography
                      variant="body2"
                      component="span"
                      sx={{
                        color: theme.palette.primary.main,
                      }}
                    >
                      Total
                    </Typography>
                    <Typography
                      variant="body2"
                      component="span"
                      sx={{
                        color: theme.palette.primary.main,
                      }}
                    >
                      $45.00
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Paper>
      </Paper>
    </Box>
  );
};
