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
import { TableTotal } from "./components/total";

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

          <TableTotal />
        
      </Paper>
    </Box>
  );
};
