import { alpha, styled } from "@mui/material/styles";
import React, { InputHTMLAttributes } from "react";
import InputLabel from "@mui/material/InputLabel";
import { TextField, TextFieldProps, useTheme } from "@mui/material";

interface Props {
  error?: boolean;
}

const InputCustom = styled(TextField)(({ theme, error }) => ({
  "& + fieldset": {
    border: "none",
  },
  "& .MuiFormHelperText-root": {
    color: theme.palette.error.main,
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor:
      theme.palette.mode == "dark"
        ? alpha(theme.palette.background.default, 0.67)
        : alpha(theme.palette.background.paper, 0.67),
    border: `1px solid ${
      error
        ? theme.palette.error.main
        : alpha(theme.palette.text.secondary, 0.05)
    }`,
    fontSize: 15,
    width: "100%",
    padding: "14px 16px",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    "&:hover + fieldset": {
      border: `1px solid ${
        error
          ? theme.palette.error.main
          : alpha(theme.palette.primary.main, 0.7)
      }`,
    },
    "&:focus": {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
    "&::placeholder": {
      color: theme.palette.text.secondary,
    },
  },
}));

export const Input: React.FC<TextFieldProps & Props> = (props) => {

  const theme = useTheme();
  return (
    <React.Fragment>
      <InputLabel
        shrink
        htmlFor={props.id}
        sx={{
          fontWeight: "bold",
          fontSize: 17,
          lineHeight: "26px",
          color: props.error
            ? theme.palette.error.main
            : theme.palette.text.secondary,
        }}
      >
        {props.name}
      </InputLabel>
      <InputCustom
        sx={{
          width: "100%",
        }}
        {...props}
        helperText={props.error && props.helperText}
      />
    </React.Fragment>
  );
};
