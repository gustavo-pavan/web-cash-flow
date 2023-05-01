import React from "react";
import { Container } from "../container";
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
import { Input } from "../components/input";
import { FileDownload, Add } from "@mui/icons-material";

export const Home: React.FC = () => {
  const theme = useTheme();
  console.log(theme);
  const currencies = [
    {
      value: "USD",
      label: "$",
    },
    {
      value: "EUR",
      label: "€",
    },
    {
      value: "BTC",
      label: "฿",
    },
    {
      value: "JPY",
      label: "¥",
    },
  ];

  function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number
  ) {
    return { name, calories, fat, carbs, protein };
  }

  const rows = [
    createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
    createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
    createData("Eclair", 262, 16.0, 24, 6.0),
    createData("Cupcake", 305, 3.7, 67, 4.3),
    createData("Gingerbread", 356, 16.0, 49, 3.9),
  ];

  return (
    <Box>
      <Paper
        elevation={1}
        sx={{
          paddingBottom: 2,
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

        <Box padding={2}>
          <Input name="Name *" placeholder="Name *" id="name" />
        </Box>

        <Divider />

        <Box padding={2}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Input name="Name *" placeholder="Name *" id="name" />
            </Grid>
            <Grid item xs={4}>
              <Input name="Name *" placeholder="Name *" id="name" />
            </Grid>
            <Grid item xs={4}>
              <Input name="Name *" placeholder="Name *" id="name" />
            </Grid>
          </Grid>

          <Box mt={2}>
            <Input
              select
              name="Name *"
              id="name"
              type="password"
              label="Select"
            >
              {currencies.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Input>
          </Box>
        </Box>

      <Box sx={{
        width: "100%", display: "flex", justifyContent: "end"
      }}>
      <Button size="small" color="secondary" variant="outlined" startIcon={<Add />}  sx={{
          margin: 2
        }}>
          Add Flow
        </Button>
      </Box>
        
        <Divider />

        <Box p={2}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Dessert (100g serving)</TableCell>
                  <TableCell align="right">Calories</TableCell>
                  <TableCell align="right">Fat&nbsp;(g)</TableCell>
                  <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                  <TableCell align="right">Protein&nbsp;(g)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.calories}</TableCell>
                    <TableCell align="right">{row.fat}</TableCell>
                    <TableCell align="right">{row.carbs}</TableCell>
                    <TableCell align="right">{row.protein}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <Divider />

        <Paper
          sx={{
            padding: 2,
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
