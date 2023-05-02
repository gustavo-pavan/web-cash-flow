import { BankAccount } from "@/domain/entity/bank-account";
import { makeCreateBankAccountFactory } from "@/main/factory/bank-account/create-bank-account.factory";
import { Input } from "@/presentation/components/input";
import { snackbarState } from "@/presentation/components/snackbar/atom";
import { CleaningServices, Add, Edit } from "@mui/icons-material";
import {
  Paper,
  Grid,
  useTheme,
  Button,
} from "@mui/material";
import { alpha, Box } from "@mui/system";
import React from "react";
import { useSetRecoilState } from "recoil";

export const Form: React.FC = () => {
  const setSnackbarState = useSetRecoilState(snackbarState);

  const createBankAccount = makeCreateBankAccountFactory();
  const updateBankAccount = makeCreateBankAccountFactory();

  const [name, setName] = React.useState<string>("");
  const [balance, setBalance] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");
  const [id, setId] = React.useState<string>("");
  const [nameError, setNameError] = React.useState<boolean>(false);
  const [balanceError, setBalanceError] = React.useState<boolean>(false);
  const [descriptionError, setDescriptionError] =
    React.useState<boolean>(false);
  const [idError, setIdError] = React.useState<boolean>(false);

  const validate = (): boolean => {
    return !name || !description || !balance;
  };

  const fieldIsValid: boolean = validate();

  const onHanlderClean = () => {
    setName("");
    setDescription("");
    setBalance("");
    setId("");
  };

  const onHandlerName = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setName(event.target.value);
    if (event.target.value) setNameError(false);
    else setNameError(true);
  };

  const onHandlerDescription = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setDescription(event.target.value);
    if (event.target.value) setDescriptionError(false);
    else setDescriptionError(true);
  };

  const onHandlerBalance = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setBalance(event.target.value);
    if (event.target.value && parseFloat(event.target.value) <= 0) setBalanceError(true);
    else setBalanceError(false);
  };

  const onHandlerCreate = (bankAccount: BankAccount) => {
    createBankAccount
      .request(bankAccount)
      .then((data) => {
        if (data) {
          setSnackbarState({
            message: "Create with success!",
            open: true,
            type: "success",
          });

          onHanlderClean();
        }
      })
      .catch((error) => {
        setSnackbarState({
          message: "Unable to create, try again later",
          open: true,
          type: "error",
        });
      });
  };

  const onHandlerUpdate = (bankAccount: BankAccount) => {
    updateBankAccount
      .request(bankAccount)
      .then((data) => {
        if (data) {
          setSnackbarState({
            message: "Update with success!",
            open: true,
            type: "success",
          });

          onHanlderClean();
        }
      })
      .catch((error) => {
        setSnackbarState({
          message: "Unable to update, try again later",
          open: true,
          type: "error",
        });
      });
  };

  const onHandlerSubmit = () => {
    if (!nameError && !balanceError && !descriptionError && !idError) {
      const bankAccount: BankAccount = {
        balance: parseFloat(balance),
        description: description,
        name: name,
        id: id,
      };

      if (!id) onHandlerCreate(bankAccount);
      else onHandlerUpdate(bankAccount);
    } else {
      setSnackbarState({
        message: "Fields is not valid",
        open: true,
        type: "error",
      });
    }
  };

  const theme = useTheme();
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
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Input
            error={nameError}
            name="Name *"
            placeholder="Name *"
            helperText="Name is required"
            type="text"
            onChange={onHandlerName}
            value={name}
          />
        </Grid>
        <Grid item xs={12}>
          <Input
            error={descriptionError}
            helperText="Description is required"
            name="Description *"
            placeholder="Description *"
            type="text"
            onChange={onHandlerDescription}
            value={description}
          />
        </Grid>
        <Grid item xs={12}>
          <Input
            error={balanceError}
            helperText="Balance is required"
            name="Balance *"
            placeholder="Balance *"
            type="number"
            onChange={onHandlerBalance}
            value={balance}
          />
        </Grid>
      </Grid>

      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "end",
          marginTop: 2,
        }}
      >
        <Button
          disabled={fieldIsValid}
          size="small"
          color="error"
          variant="outlined"
          startIcon={<CleaningServices />}
          sx={{
            margin: 2,
          }}
          onClick={onHanlderClean}
        >
          Clean Data
        </Button>

        <Button
          size="medium"
          color="secondary"
          variant="contained"
          startIcon={id ? <Edit /> : <Add />}
          onClick={onHandlerSubmit}
          disabled={fieldIsValid}
          sx={{
            margin: 2,
          }}
        >
          {id ? "Update Account" : "Add Account"}
        </Button>
      </Box>
    </Paper>
  );
};
