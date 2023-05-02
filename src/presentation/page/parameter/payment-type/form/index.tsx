import { Input } from "@/presentation/components/input";
import { snackbarState } from "@/presentation/components/snackbar/atom";
import { CleaningServices, Add, Edit } from "@mui/icons-material";
import { Paper, Grid, useTheme, Button } from "@mui/material";
import { alpha, Box } from "@mui/system";
import React from "react";
import { useRecoilState, useResetRecoilState, useSetRecoilState } from "recoil";
import {
  paymentTypeState,
  paymentTypesStates,
} from "../../components/atom/atom";
import { makeCreatePaymentTypeFactory } from "@/main/factory/payment-type/create-payment-type.factory";
import { makeGetPaymentTypeFactory } from "@/main/factory/payment-type/get-payment-type.factory";
import { PaymentType } from "@/domain/entity/payment-type";
import { makeUpdatePaymentTypeFactory } from "@/main/factory/payment-type/update-payment-type.factory";

export const Form: React.FC = () => {
  const resetPaymentAccountState = useResetRecoilState(paymentTypesStates);
  const resetPaymentTypesStates = useResetRecoilState(paymentTypeState);

  React.useEffect(() => resetPaymentAccountState(), []);
  React.useEffect(() => resetPaymentTypesStates(), []);

  const setSnackbarState = useSetRecoilState(snackbarState);
  const [paymentState, setPaymentState] = useRecoilState(paymentTypeState);

  const setPaymentTypes = useSetRecoilState(paymentTypesStates);

  const createPaymentType = makeCreatePaymentTypeFactory();
  const updatePaymentType = makeUpdatePaymentTypeFactory();

  const [name, setName] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");
  const [id, setId] = React.useState<string>("");

  const [nameError, setNameError] = React.useState<boolean>(false);
  const [descriptionError, setDescriptionError] =
    React.useState<boolean>(false);
  const [idError, setIdError] = React.useState<boolean>(false);

  const validate = (): boolean => {
    return !name || !description;
  };

  React.useEffect(() => {
    setName(paymentState?.paymentType?.name);
    setDescription(paymentState?.paymentType?.description);
    setId(paymentState?.paymentType?.id);
  }, [paymentState]);

  const getBankAccount = makeGetPaymentTypeFactory();

  React.useEffect(() => {
    getBankAccount
      .request()
      .then((data) => {
        setPaymentTypes({ paymentTypes: data });
      })
      .catch((x) => console.log(x));
  }, []);

  const refreshList = () => {
    getBankAccount
      .request()
      .then((data) => {
        setPaymentTypes({ paymentTypes: data });
      })
      .catch((x) => console.log(x));
  };

  const fieldIsValid: boolean = validate();

  const onHanlderClean = () => {
    setName("");
    setDescription("");
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

  const onHandlerCreate = (paymentType: PaymentType) => {
    createPaymentType
      .request(paymentType)
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

  const onHandlerUpdate = (paymentType: PaymentType) => {
    updatePaymentType
      .request(paymentType)
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
    if (!nameError && !descriptionError && !idError) {
      const paymentType: PaymentType = {
        description: description,
        name: name,
        id: id,
      };

      if (!id) onHandlerCreate(paymentType);
      else onHandlerUpdate(paymentType);
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
          {id ? "Update Payment" : "Add Payment"}
        </Button>
      </Box>
    </Paper>
  );
};
