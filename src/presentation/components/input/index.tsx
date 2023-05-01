import { alpha, styled } from "@mui/material/styles";
import React, { InputHTMLAttributes } from "react";
import InputLabel from "@mui/material/InputLabel";
import { TextField, TextFieldProps } from "@mui/material";

const InputCustom = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.default,
    border: `1px solid ${alpha(theme.palette.text.primary, 0.2)}`,
    fontSize: 15,
    width: "100%",
    padding: "14px 16px",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    "&:focus": {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
    "&::placeholder": {
      color: theme.palette.text.secondary,
    },
  },
}));

export const Input: React.FC<TextFieldProps> = (props) => {
  return (
    <React.Fragment>
      <InputLabel
        shrink
        htmlFor={props.id}
        sx={{
          fontWeight: "bold",
          fontSize: 17,
          lineHeight: "26px",
        }}
      >
        {props.name}
      </InputLabel>
      <InputCustom
        sx={{
          width: "100%",
        }}
        {...props}
      />
    </React.Fragment>
  );
};
