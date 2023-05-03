import { BankAccount } from "@/domain/entity/bank-account";
import { makeCreateBankAccountFactory } from "@/main/factory/bank-account/create-bank-account.factory";
import { Input } from "@/presentation/components/input";
import { snackbarState } from "@/presentation/components/snackbar/atom";
import { CleaningServices, Add, Edit } from "@mui/icons-material";
import { Paper, Grid, useTheme, Button } from "@mui/material";
import { alpha, Box } from "@mui/system";
import React from "react";
import { useRecoilState, useResetRecoilState, useSetRecoilState } from "recoil";
import {
  bankAccountState,
  bankAccountsStates,
} from "../../components/atom/atom";
import { makeGetBankAccountFactory } from "@/main/factory/bank-account/get-bank-account.factory";
import { makeUpdateBankAccountFactory } from "@/main/factory/bank-account/update-bank-account.factory";
import { NumericFormatCustom } from "@/presentation/components/input/mask";

export const Form: React.FC = () => {
  const resetAccountState = useResetRecoilState(bankAccountState);
  const resetAccountsStates = useResetRecoilState(bankAccountsStates);

  React.useEffect(() => resetAccountState(), []);
  React.useEffect(() => resetAccountsStates(), []);

  const setSnackbarState = useSetRecoilState(snackbarState);
  const [accountState, setBankAccount] = useRecoilState(bankAccountState);

  const setBankAccounts = useSetRecoilState(bankAccountsStates);

  const createBankAccount = makeCreateBankAccountFactory();
  const updateBankAccount = makeUpdateBankAccountFactory();

  const [name, setName] = React.useState<string>("");
  const [balance, setBalance] = React.useState<number>(null);
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

  React.useEffect(() => {
    setName(accountState?.bankAccount?.name);
    setBalance(accountState?.bankAccount?.balance);
    setDescription(accountState?.bankAccount?.description);
    setId(accountState?.bankAccount?.id);
  }, [accountState]);

  const getBankAccount = makeGetBankAccountFactory();

  React.useEffect(() => {
    getBankAccount
      .request()
      .then((data) => {
        setBankAccounts({ bankAccounts: data });
      })
      .catch((x) => console.log(x));
  }, []);

  const refreshList = () => {
    getBankAccount
      .request()
      .then((data) => {
        setBankAccounts({ bankAccounts: data });
      })
      .catch((x) => console.log(x));
  };

  const fieldIsValid: boolean = validate();

  const onHanlderClean = () => {
    setName("");
    setDescription("");
    setBalance(0);
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
    setBalance(parseFloat(event.target.value));
    if (event.target.value && parseFloat(event.target.value) <= 0)
      setBalanceError(true);
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

          refreshList();
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
          refreshList();
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
        balance: balance,
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
            type="text"
            onChange={onHandlerBalance}
            value={balance}
            InputProps={{
              inputComponent: NumericFormatCustom as any,
            }}
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
