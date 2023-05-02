import React from "react";
import { useTheme } from "@mui/material/styles";
import { Header } from "./components/header";
import { Tab } from "./components/tab";


export const Parameter: React.FC = () => {
   return (
    <React.Fragment>
      <Header />
      <Tab />
    </React.Fragment>
  );
};
