import { Flow, Status } from "@/domain/entity/flow";
import { makeGetFlowFactory } from "@/main/factory/flow/get-flow.factory";
import {
  Box,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  useTheme,
  IconButton,
  Typography,
  alpha,
} from "@mui/material";
import React from "react";
import { useRecoilState } from "recoil";
import { flowState, flowStates } from "../atom/atom";
import { Delete, Edit } from "@mui/icons-material";


export const TableFlow: React.FC = () => {
  const theme = useTheme();
  const getFlow = makeGetFlowFactory();

  const [flows, setFlows] = useRecoilState(flowStates);
  const [flow, setFlow] = useRecoilState(flowState);


  const onHandlerUpdate = (flow: Flow) => {
    setFlow({flowState: flow})
  }

  React.useEffect(() => {
    getFlow.request().then((data) => {
      setFlows({ flowStates: data });
    });
  }, []);


  return (
    <Box p={2}>
      <TableContainer
        component={Paper}
        sx={{
          background:
            theme.palette.mode == "dark"
              ? theme.palette.background.paper
              : theme.palette.background.default,
        }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Flow</TableCell>
              <TableCell>Payment Type</TableCell>
              <TableCell>Posting Date</TableCell>
              <TableCell>Expiration Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Value</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {flows?.flowStates?.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.flowParameterName}
                </TableCell>
                <TableCell>{row.paymentTypeName}</TableCell>
                <TableCell>
                  {new Date(row.postingDate).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {new Date(row.expirationDate).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {row.status == Status.Open ? (
                    <Typography
                      variant="body1"
                      component="span"
                      sx={{
                        color: alpha(theme.palette.error.main, 0.7),
                      }}
                    >
                      Open
                    </Typography>
                  ) : (
                    <Typography
                      variant="body1"
                      component="span"
                      sx={{
                        color: alpha(theme.palette.success.main, 0.7),
                      }}
                    >
                      Closed
                    </Typography>
                  )}
                </TableCell>
                <TableCell align="right">{row.value.toFixed(2)}</TableCell>
                <TableCell align="right">
                  <IconButton
                    edge="end"
                    aria-label="update"
                    sx={{
                      marginRight: 2,
                      color: theme.palette.text.secondary,
                    }}
                    onClick={() => onHandlerUpdate(row)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton edge="end" aria-label="delete" color="error">
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
