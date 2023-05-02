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
  paymentTypeState,
  paymentTypesStates,
} from "../../components/atom/atom";
import { useRecoilState, useSetRecoilState } from "recoil";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { snackbarState } from "@/presentation/components/snackbar/atom";
import { makeDeletePaymentTypeFactory } from "@/main/factory/payment-type/delete-payment-type.factory";
import { makeGetPaymentTypeFactory } from "@/main/factory/payment-type/get-payment-type.factory";
import { PaymentType } from "@/domain/entity/payment-type";

export const ListPaymentType: React.FC = () => {
  const theme = useTheme();

  const deletePaymentType = makeDeletePaymentTypeFactory();
  const getAllPaymentType = makeGetPaymentTypeFactory();
  const setSnackbarState = useSetRecoilState(snackbarState);
  
  const [paymentTypesState, setPaymentTypes] =
    useRecoilState(paymentTypesStates);

  const setPaymentType = useSetRecoilState(paymentTypeState);
  const [payment, setPayment] = React.useState<PaymentType>();

  const handlerUpdate = (payment: PaymentType) => {
    setPaymentType({ paymentType: payment });
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (payment: PaymentType) => {
    setPayment(payment);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    deletePaymentType.request(payment.id).then((data) => {
      if (data) {
        setPaymentType({paymentType: {description: "", name: "",id: ""}})
        getAllPaymentType.request().then((payment) => {
          setPaymentTypes({ paymentTypes:  payment});
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
          {paymentTypesState?.paymentTypes?.map((bankAccount) => {
            return (
              <React.Fragment key={bankAccount.id}>
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
                        onClick={() => handlerUpdate(bankAccount)}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        color="error"
                        onClick={() => handleClickOpen(bankAccount)}
                      >
                        <Delete />
                      </IconButton>
                    </Box>
                  }
                >
                  <ListItemText
                    primary={bankAccount.name}
                    secondary={bankAccount.description}
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
            {payment?.name} - {payment?.description}
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
