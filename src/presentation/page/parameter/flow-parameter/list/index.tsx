import { Edit, Delete } from "@mui/icons-material";
import {
  Paper,
  Typography,
  List,
  ListItem,
  IconButton,
  ListItemText,
  Divider,
  useTheme,
  Button,
} from "@mui/material";
import { alpha, Box } from "@mui/system";
import React from "react";
import {
  flowParameterState,
  flowParametersStates,
} from "../../components/atom/atom";
import { useRecoilState, useSetRecoilState } from "recoil";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { snackbarState } from "@/presentation/components/snackbar/atom";
import { makeDeleteFlowParameterFactory } from "@/main/factory/flow-parameter/delete-flow-parameter.factory";
import { makeGetFlowParameterFactory } from "@/main/factory/flow-parameter/get-flow-parameter.factory";
import {
  EFlowType,
  FlowParameter,
  FlowType,
} from "@/domain/entity/flow-parameter";

export const ListFlowParameter: React.FC = () => {
  const theme = useTheme();

  const deleteFlowParameter = makeDeleteFlowParameterFactory();
  const getAllFlowParameter = makeGetFlowParameterFactory();
  const setSnackbarState = useSetRecoilState(snackbarState);

  const [flowParametersState, setFlowParameters] =
    useRecoilState(flowParametersStates);

  const setFlowParameter = useSetRecoilState(flowParameterState);
  const [flow, setFlow] = React.useState<FlowParameter>();

  const handlerUpdate = (flow: FlowParameter) => {
    const newFlow: FlowParameter = {
      description: flow.description,
      flowTypeNumber: flow.flowType.id,
      name: flow.name,
      id: flow.id,
    };

    setFlowParameter({ flowParameter: newFlow });
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (flow: FlowParameter) => {
    setFlow(flow);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    deleteFlowParameter.request(flow.id).then((data) => {
      if (data) {
        setFlowParameter({
          flowParameter: {
            description: "",
            name: "",
            id: "",
            flowTypeNumber: 0,
          },
        });
        getAllFlowParameter.request().then((flow) => {
          setFlowParameters({ flowParameters: flow });
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
          {flowParametersState?.flowParameters?.map((flowParameter) => {
            return (
              <React.Fragment key={flowParameter.id}>
                <ListItem
                  secondaryAction={
                    <Box>
                      <IconButton
                        edge="end"
                        aria-label="update"
                        sx={{
                          marginRight: 2,
                          color: theme.palette.text.secondary,
                        }}
                        onClick={() => handlerUpdate(flowParameter)}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        color="error"
                        onClick={() => handleClickOpen(flowParameter)}
                      >
                        <Delete />
                      </IconButton>
                    </Box>
                  }
                >
                  <ListItemText
                    primary={flowParameter.name}
                    secondary={
                      flowParameter.description +
                      " - " +
                      flowParameter.flowType.name
                    }
                  />
                </ListItem>
                <Divider />
              </React.Fragment>
            );
          })}
        </List>
      </Box>
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
            {flow?.name} - {flow?.description}
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
          <Button
            size="small"
            color="error"
            variant="outlined"
            onClick={handleDelete}
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};
