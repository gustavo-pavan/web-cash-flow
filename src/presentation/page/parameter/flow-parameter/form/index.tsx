import { Input } from "@/presentation/components/input";
import { snackbarState } from "@/presentation/components/snackbar/atom";
import { CleaningServices, Add, Edit } from "@mui/icons-material";
import { Paper, Grid, useTheme, Button, MenuItem } from "@mui/material";
import { alpha, Box } from "@mui/system";
import React from "react";
import { useRecoilState, useResetRecoilState, useSetRecoilState } from "recoil";
import {
  flowParameterState,
  flowParametersStates,
} from "../../components/atom/atom";
import { makeCreateFlowParameterFactory } from "@/main/factory/flow-parameter/create-flow-parameter.factory";
import { makeUpdateFlowParameterFactory } from "@/main/factory/flow-parameter/update-flow-parameter.factory";
import { makeGetFlowParameterFactory } from "@/main/factory/flow-parameter/get-flow-parameter.factory";
import {
  EFlowType,
  FlowParameter,
  FlowType,
} from "@/domain/entity/flow-parameter";

export const Form: React.FC = () => {
  const resetFlowParameterState = useResetRecoilState(flowParameterState);
  const resetFlowParametersStates = useResetRecoilState(flowParametersStates);

  React.useEffect(() => resetFlowParameterState(), []);
  React.useEffect(() => resetFlowParametersStates(), []);

  const setSnackbarState = useSetRecoilState(snackbarState);
  const [flowState, setFlowParameter] = useRecoilState(flowParameterState);

  const setFlowParameters = useSetRecoilState(flowParametersStates);

  const createFlowParameter = makeCreateFlowParameterFactory();
  const updateFlowParameter = makeUpdateFlowParameterFactory();

  const [name, setName] = React.useState<string>("");
  const [flowType, setFlowType] = React.useState<number>(0);
  const [description, setDescription] = React.useState<string>("");
  const [id, setId] = React.useState<string>("");

  const [nameError, setNameError] = React.useState<boolean>(false);
  const [descriptionError, setDescriptionError] =
    React.useState<boolean>(false);
  const [flowTypeError, setFlowTypeError] = React.useState<boolean>(false);
  const [idError, setIdError] = React.useState<boolean>(false);

  const validate = (): boolean => {
    return !name || !description || !flowType;
  };

  React.useEffect(() => {
    setName(flowState?.flowParameter?.name);
    setDescription(flowState?.flowParameter?.description);
    setId(flowState?.flowParameter?.id);
    setFlowType(flowState?.flowParameter?.flowTypeNumber);
  }, [flowState]);

  const getFlowParameter = makeGetFlowParameterFactory();

  React.useEffect(() => {
    getFlowParameter
      .request()
      .then((data) => {
        setFlowParameters({ flowParameters: data });
      })
      .catch((x) => console.log(x));
  }, []);

  const refreshList = () => {
    getFlowParameter
      .request()
      .then((data) => {
        setFlowParameters({ flowParameters: data });
      })
      .catch((x) => console.log(x));
  };

  const fieldIsValid: boolean = validate();

  const onHanlderClean = () => {
    setName("");
    setDescription("");
    setFlowType(null);
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

  const onHandlerFlowType = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFlowType(parseFloat(event.target.value));
    if (event.target.value) setFlowTypeError(false);
    else setFlowTypeError(true);
  };

  const onHandlerCreate = (flowParameter) => {
    createFlowParameter
      .request(flowParameter)
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

  const onHandlerUpdate = (flowParameter) => {
    updateFlowParameter
      .request(flowParameter)
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
    if (!nameError && !descriptionError && !idError && !flowTypeError) {
      const flowParameter = {
        description: description,
        name: name,
        id: id,
        flowType: flowType,
      };

      if (!id) onHandlerCreate(flowParameter);
      else onHandlerUpdate(flowParameter);
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
            name="Nome *"
            placeholder="Nome *"
            helperText="Nome é obrigatório"
            type="text"
            onChange={onHandlerName}
            value={name}
          />
        </Grid>
        <Grid item xs={12}>
          <Input
            error={descriptionError}
            helperText="Descrição é obrigatório"
            name="Descrição *"
            placeholder="Descrição *"
            type="text"
            onChange={onHandlerDescription}
            value={description}
          />
        </Grid>

        <Grid item xs={12}>
          <Input
            error={descriptionError}
            helperText="Tipo do fluxo é obrigatório"
            name="Tipo de fluxo *"
            placeholder="Tipo de fluxo *"
            select
            onChange={onHandlerFlowType}
            value={flowType}
          >
            {(Object.keys(EFlowType) as Array<keyof typeof EFlowType>).map(
              (key) => {
                if (!isNaN(Number(key)) && Number(key) !== 0)
                  return (
                    <MenuItem key={key} value={key}>
                      {Number(key) === EFlowType.Debit ? "Débito" : "Crédito"}
                    </MenuItem>
                  );
              }
            )}
          </Input>
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
          Limpar campos
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
          {id ? "Editar" : "Adicionar"}
        </Button>
      </Box>
    </Paper>
  );
};
