import React from "react";
import { useTheme } from "@mui/material/styles";
import { Header } from "./components/header";
import { Tab } from "./components/tab";
import { Snackbar } from "@/presentation/components/snackbar";


export const Parameter: React.FC = () => {
   return (
    <React.Fragment>
      <Header />
      <Tab />
      <Snackbar />
    </React.Fragment>
  );
};
