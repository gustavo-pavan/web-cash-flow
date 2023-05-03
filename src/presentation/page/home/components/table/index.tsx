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
import { dateFilterState, flowState, flowStates } from "../atom/atom";
import { Delete, Edit } from "@mui/icons-material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { makeDeleteFlowFactory } from "@/main/factory/flow/delete-flow.factory";
import { snackbarState } from "@/presentation/components/snackbar/atom";
import { EFlowType } from "@/domain/entity/flow-parameter";

export const TableFlow: React.FC = () => {
  const theme = useTheme();
  const getFlow = makeGetFlowFactory();
  const deleteFlow = makeDeleteFlowFactory();
  const setSnackbarState = useSetRecoilState(snackbarState);
  const [dateFilter, setDateFiler] = useRecoilState(dateFilterState);

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
    getFlow.request(dateFilter.dateFilterState).then((data) => {
      setFlows({ flowStates: data });
    });
  }, [dateFilter.dateFilterState]);

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
        getFlow.request(dateFilter.dateFilterState).then((flows) => {
          setFlows({ flowStates: flows });
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
              <TableCell>Descrição</TableCell>
              <TableCell>Tipo Pagamento</TableCell>
              <TableCell>Fluxo</TableCell>
              <TableCell>Tipo de Fluxo</TableCell>
              <TableCell>Data lançamento</TableCell>
              <TableCell>Data expiração</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Valor</TableCell>
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
                <TableCell component="th" scope="row">
                  {row.flowType === EFlowType.Credit ? "Crédito" : "Débito"}
                </TableCell>
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
                      Aberto
                    </Typography>
                  ) : (
                    <Typography
                      variant="body1"
                      component="span"
                      sx={{
                        color: alpha(theme.palette.success.main, 0.7),
                      }}
                    >
                      Fechado
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
          {"Você deseja deletar esse fluxo?"}
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
            Cancelar
          </Button>
          <Button
            size="small"
            color="error"
            variant="outlined"
            autoFocus
            onClick={handleDelete}
          >
            Deletar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
