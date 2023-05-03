import { Flow, Status } from "@/domain/entity/flow";
import { FlowParameter } from "@/domain/entity/flow-parameter";
import { PaymentType } from "@/domain/entity/payment-type";
import { makeGetFlowParameterFactory } from "@/main/factory/flow-parameter/get-flow-parameter.factory";
import { makeCreateFlowFactory } from "@/main/factory/flow/create-flow.factory";
import { makeGetFlowFactory } from "@/main/factory/flow/get-flow.factory";
import { makeUpdateFlowFactory } from "@/main/factory/flow/update-flow.factory";
import { makeGetPaymentTypeFactory } from "@/main/factory/payment-type/get-payment-type.factory";
import { Input } from "@/presentation/components/input";
import { snackbarState } from "@/presentation/components/snackbar/atom";
import { Add, CleaningServices, Edit } from "@mui/icons-material";
import { Box, Button, Divider, Grid, MenuItem } from "@mui/material";
import React from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { dateFilterState, flowState, flowStates } from "../atom/atom";
import { formatDate } from "@/presentation/components/format/date";
import { NumericFormatCustom } from "@/presentation/components/input/mask";

export const Form: React.FC = () => {
  const getPaymentType = makeGetPaymentTypeFactory();
  const getFlowParameter = makeGetFlowParameterFactory();

  const [dateFilter, setDateFiler] = useRecoilState(dateFilterState);


  const createFlow = makeCreateFlowFactory();
  const updateFlow = makeUpdateFlowFactory();

  const getFlow = makeGetFlowFactory();

  const [flows, setFlows] = useRecoilState(flowStates);
  const [flow, setFlow] = useRecoilState(flowState);

  const setSnackbarState = useSetRecoilState(snackbarState);

  const [paymentTypes, setPaymentTypes] = React.useState<Array<PaymentType>>();
  const [flowParameters, setFlowParameters] =
    React.useState<Array<FlowParameter>>();

  const [paymentTypeId, setPaymentTypeId] = React.useState<string>("");
  const [paymentTypeIdError, setPaymentTypeIdError] =
    React.useState<boolean>(false);
  const [flowParameterId, setFlowParameterId] = React.useState<string>("");
  const [FlowParameterIdError, setFlowParameterIdError] =
    React.useState<boolean>(false);
  const [postingDate, setPostingDate] = React.useState<string>();
  const [postingDateError, setPostingDateError] =
    React.useState<boolean>(false);
  const [expirationDate, setExpirationDate] = React.useState<string>();
  const [expirationDateError, setExpirationDateError] =
    React.useState<boolean>(false);
  const [description, setDescription] = React.useState<string>("");
  const [descriptionError, setDescriptionError] =
    React.useState<boolean>(false);
  const [value, setValue] = React.useState<number>();
  const [valueError, setValueError] = React.useState<boolean>(false);
  const [status, setStatus] = React.useState<number>(0);
  const [statusError, setStatusError] = React.useState<boolean>(false);
  const [id, setId] = React.useState<string>("");
  const [idError, setIdError] = React.useState<boolean>(false);

  React.useEffect(() => {
    console.log(flow.flowState);
    setDescription(flow?.flowState?.description);
    setPostingDate(formatDate(new Date(flow?.flowState?.postingDate)));
    setExpirationDate(formatDate(new Date(flow?.flowState?.expirationDate)));
    setValue(flow?.flowState?.value);
    setPaymentTypeId(flow?.flowState?.paymentTypeId);
    setFlowParameterId(flow?.flowState?.flowParameterId);
    setStatus(flow?.flowState?.status);
    setId(flow?.flowState?.id);
  }, [flow]);

  React.useEffect(() => {
    getPaymentType.request().then((data) => {
      setPaymentTypes(data);
    });
  }, []);

  React.useEffect(() => {
    getFlowParameter.request().then((data) => {
      setFlowParameters(data);
    });
  }, []);

  const validateForm = (): boolean => {
    return (
      !paymentTypeId ||
      !flowParameterId ||
      !postingDate ||
      !expirationDate ||
      !description ||
      !value
    );
  };

  const isValid: boolean = validateForm();

  const validError = (): boolean => {
    return (
      paymentTypeIdError &&
      FlowParameterIdError &&
      postingDateError &&
      expirationDateError &&
      descriptionError &&
      valueError
    );
  };

  const onHandlerRefreshList = () => {
    getFlow.request(dateFilter.dateFilterState).then((data) => {
      setFlows({ flowStates: data });
    });
  };

  const hasError: boolean = validError();

  const onHandlerCreate = (flow: Flow) => {
    createFlow
      .request(flow)
      .then((data) => {
        setSnackbarState({
          message: "Create with success!",
          open: true,
          type: "success",
        });
        onHandlerClean();

        onHandlerRefreshList();
      })
      .catch((error) => {
        setSnackbarState({
          message: "Unable to create, try again later",
          open: true,
          type: "error",
        });
      });
  };

  const onHandlerUpdate = (flow: Flow) => {
    updateFlow
      .request(flow)
      .then((data) => {
        setSnackbarState({
          message: "Create with success!",
          open: true,
          type: "success",
        });
        onHandlerClean();
        onHandlerRefreshList();
      })
      .catch((error) => {
        setSnackbarState({
          message: "Unable to create, try again later",
          open: true,
          type: "error",
        });
      });
  };

  const onHandlerClean = () => {
    setDescription("");
    setExpirationDate("");
    setPostingDate("");
    setPaymentTypeId("");
    setFlowParameterId("");
    setValue(0);
    setStatus(0);
    setId("");
  };

  const onHandlerSubmit = () => {
    if (!hasError) {
      const flow: Flow = {
        description: description,
        expirationDate: expirationDate,
        flowParameterId: flowParameterId,
        paymentTypeId: paymentTypeId,
        postingDate: postingDate,
        status: status,
        value: value,
        id: id,
      };

      if (!id) onHandlerCreate(flow);
      else onHandlerUpdate(flow);
    }
  };

  const onHandlerPaymentTypeId = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPaymentTypeId(event.target.value);
    if (event.target.value) setPaymentTypeIdError(false);
    else setPaymentTypeIdError(true);
  };

  const onHandlerFlowParameterId = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFlowParameterId(event.target.value);
    if (event.target.value) setFlowParameterIdError(false);
    else setFlowParameterIdError(true);
  };

  const onHandlerPostingDate = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPostingDate(event.target.value);
    if (event.target.value) setPostingDateError(false);
    else setPostingDateError(true);

    if (new Date(event.target.value) > new Date(expirationDate)) {
      setPostingDateError(true);
      setExpirationDateError(true);
    } else {
      setPostingDateError(false);
      setExpirationDateError(false);
    }
  };

  const onHandlerExpirationDate = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setExpirationDate(event.target.value);
    if (event.target.value) setExpirationDateError(false);
    else setExpirationDateError(true);

    if (new Date(event.target.value) < new Date(postingDate)) {
      setPostingDateError(true);
      setExpirationDateError(true);
    } else {
      setPostingDateError(false);
      setExpirationDateError(false);
    }
  };

  const onHandlerDescription = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setDescription(event.target.value);
    if (event.target.value) setDescriptionError(false);
    else setDescriptionError(true);
  };
  const onHandlerValue = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValue(parseFloat(event.target.value));
    if (event.target.value) setValueError(false);
    else setValueError(true);
  };
  const onHandlerStatus = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setStatus(parseFloat(event.target.value));
    if (event.target.value) setStatusError(false);
    else setStatusError(true);
  };

  return (
    <React.Fragment>
      <Box padding={2}>
        <Input
          name="Descrição *"
          placeholder="Descrição *"
          id="description"
          error={descriptionError}
          helperText="Descrição é obrigatório"
          onChange={onHandlerDescription}
          value={description}
        />
      </Box>

      <Divider />
      <Box padding={2}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Input
              name="Data de lançamento*"
              placeholder="Data de lançamento *"
              id="postingdate"
              type="date"
              error={postingDateError}
              helperText="Data de lançamento é obrigatório e não pode ser maior que expiração"
              onChange={onHandlerPostingDate}
              value={postingDate}
            />
          </Grid>
          <Grid item xs={4}>
            <Input
              name="Data de expiração *"
              placeholder="Data de expiração *"
              id="expirationdate"
              type="date"
              error={expirationDateError}
              helperText="Data de expiração é obrigatório e não pode ser maior que lançamento"
              onChange={onHandlerExpirationDate}
              value={expirationDate}
            />
          </Grid>
          <Grid item xs={4}>
            <Input
              name="Valor *"
              placeholder="Valor *"
              id="value"
              type="text"
              error={valueError}
              helperText="Valor é obrigatório"
              onChange={onHandlerValue}
              value={value}
              InputProps={{
                inputComponent: NumericFormatCustom as any,
              }}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} mt={2}>
          <Grid item xs={4}>
            <Input
              select
              name="Tipo pagamento *"
              id="name"
              type="text"
              label="Select"
              error={paymentTypeIdError}
              helperText="Tipo pagamento é obrigatório"
              onChange={onHandlerPaymentTypeId}
              value={paymentTypeId}
            >
              {paymentTypes?.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.name}
                </MenuItem>
              ))}
            </Input>
          </Grid>
          <Grid item xs={4}>
            <Input
              select
              name="Fluxo *"
              id="name"
              type="text"
              label="Select"
              error={FlowParameterIdError}
              helperText="Fluxo é obrigatório"
              onChange={onHandlerFlowParameterId}
              value={flowParameterId}
            >
              {flowParameters?.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.name}
                </MenuItem>
              ))}
            </Input>
          </Grid>
          <Grid item xs={4}>
            <Input
              select
              name="Status *"
              id="name"
              type="text"
              label="Select"
              error={statusError}
              helperText="Status é obrigatório"
              onChange={onHandlerStatus}
              value={status}
            >
              {(Object.keys(Status) as Array<keyof typeof Status>).map(
                (key) => {
                  if (!isNaN(Number(key)))
                    return (
                      <MenuItem key={key} value={key}>
                        {Status[key]}
                      </MenuItem>
                    );
                }
              )}
            </Input>
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "end",
        }}
      >
        <Button
          disabled={isValid}
          size="small"
          color="error"
          variant="outlined"
          startIcon={<CleaningServices />}
          sx={{
            margin: 2,
          }}
          onClick={onHandlerClean}
        >
          Limpar dados
        </Button>

        <Button
          disabled={isValid}
          size="small"
          color="secondary"
          variant="outlined"
          onClick={onHandlerSubmit}
          startIcon={id ? <Edit /> : <Add />}
          sx={{
            margin: 2,
          }}
        >
          {id ? "Editar" : "Adicionar"}
        </Button>
      </Box>
    </React.Fragment>
  );
};
