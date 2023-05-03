import {
  Grid,
} from "@mui/material";
import React from "react";
import { Form } from "./form";
import { ListPaymentType } from "./list";

export const PaymentType: React.FC = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Form />
      </Grid>
      <Grid item xs={6}>
        <ListPaymentType />
      </Grid>
    </Grid>
  );
};
