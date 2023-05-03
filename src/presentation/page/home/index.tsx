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
import { Form } from "./components/form";
import { TableFlow } from "./components/table";
import { TableTotal } from "./components/total";
import { FileDownload } from "@mui/icons-material";
import { formatDate } from "@/presentation/components/format/date";
import { useRecoilState } from "recoil";
import { dateFilterState } from "./components/atom/atom";

export const Home: React.FC = () => {
  const [dateFilter, setDateFiler] = useRecoilState(dateFilterState);

  React.useEffect(() => {
    const format = formatDate(new Date())
    setDateFiler({ dateFilterState: format});
  }, []);

  const onHandlerFilterDate = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setDateFiler({ dateFilterState: event.target.value });
  };
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
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box mr={2}>
              <Button
                variant="contained"
                size="small"
                startIcon={<FileDownload />}
              >
                Export
              </Button>
            </Box>
            |
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography ml={2} mr={1} variant="body2" component="span">
                Filter
              </Typography>
              <Input
                placeholder="Filer"
                id="filer"
                type="date"
                size="small"
                value={dateFilter.dateFilterState}
                onChange={onHandlerFilterDate}
              />
            </Box>
          </Box>
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
