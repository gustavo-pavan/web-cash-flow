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
  Button,
} from "@mui/material";
import React from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { flowState, flowStates } from "../atom/atom";
import { Delete, Edit } from "@mui/icons-material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { makeDeleteFlowFactory } from "@/main/factory/flow/delete-flow.factory";
import { snackbarState } from "@/presentation/components/snackbar/atom";

export const TableFlow: React.FC = () => {
  const theme = useTheme();
  const getFlow = makeGetFlowFactory();
  const deleteFlow = makeDeleteFlowFactory();
  const setSnackbarState = useSetRecoilState(snackbarState);

  const [flows, setFlows] = useRecoilState(flowStates);
  const [flow, setFlow] = useRecoilState(flowState);

  const onHandlerUpdate = (flow: Flow) => {
    setFlow({ flowState: flow });
  };

  const [open, setOpen] = React.useState(false);
  const [flowDelete, setFlowDelete] = React.useState<Flow>();

  const handleClickOpen = (flow: Flow) => {
    setFlowDelete(flow);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    getFlow.request().then((data) => {
      setFlows({ flowStates: data });
    });
  }, []);

  const handleDelete = () => {
    deleteFlow.request(flowDelete.id).then((data) => {
      if (data) {
        setFlow({
          flowState: {
            description: "",
            expirationDate: "",
            flowParameterId: "",
            id: "",
            paymentTypeId: "",
            postingDate: "",
            status: 0,
            value: 0,
          },
        });
        getFlow.request().then((flows) => {
          setFlows({ flowStates: flows});
        });
      }
    });

    setSnackbarState({
      message: "Deleted with success!",
      open: true,
      type: "success",
    });

    handleClose();
  };

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
              <TableCell>Description</TableCell>
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
                  {row.description}
                </TableCell>
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
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    color="error"
                    onClick={() => handleClickOpen(row)}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Do you want delete this?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {flowDelete?.description} - R${flowDelete?.value}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            size="small"
            color="info"
            variant="outlined"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button size="small" color="error" variant="outlined" autoFocus onClick={handleDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
