import {
  Grid,
} from "@mui/material";
import React from "react";
import { Form } from "./form";
import { ListBankAccount } from "./list";

export const BankAccout: React.FC = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Form />
      </Grid>
      <Grid item xs={6}>
        <ListBankAccount />
      </Grid>
    </Grid>
  );
};
