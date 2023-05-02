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
import React, { useEffect } from "react";
import {
  bankAccountState,
  bankAccountsStates,
} from "../../components/atom/atom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { BankAccount } from "@/domain/entity/bank-account";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { makeDeleteBankAccountFactory } from "@/main/factory/bank-account/delete-bank-account.factory";
import { makeGetBankAccountFactory } from "@/main/factory/bank-account/get-bank-account.factory";
import { snackbarState } from "@/presentation/components/snackbar/atom";

export const ListBankAccount: React.FC = () => {
  const theme = useTheme();

  const deleteBankAccount = makeDeleteBankAccountFactory();
  const getAllBankAccount = makeGetBankAccountFactory();
  const setSnackbarState = useSetRecoilState(snackbarState);
  
  const [bankAccountsState, setBankAccounts] =
    useRecoilState(bankAccountsStates);

  const setBankAccount = useSetRecoilState(bankAccountState);
  const [account, setAccount] = React.useState<BankAccount>();

  const handlerUpdate = (account: BankAccount) => {
    setBankAccount({ bankAccount: account });
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (account: BankAccount) => {
    setAccount(account);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    deleteBankAccount.request(account.id).then((data) => {
      if (data) {
        getAllBankAccount.request().then((accounts) => {
          setBankAccounts({ bankAccounts: accounts });
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
          {bankAccountsState?.bankAccounts?.map((bankAccount) => {
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
                    secondary={
                      <Box>
                        <Typography variant="caption" component="span">
                          R${bankAccount.balance.toFixed(2)}
                        </Typography>
                      </Box>
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
            {account?.name} - R${account?.balance.toFixed(2)}
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
