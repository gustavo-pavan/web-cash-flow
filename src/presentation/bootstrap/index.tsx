import React from "react";
import ReactDOM from "react-dom";
import { Home } from "../page/home";
import { Container } from "../container";
import Route from "@/route";

const mount = (el) => {

    ReactDOM.render(<Route />, el);
  };

  
if (process.env.NODE_ENV === "development") {
  const devRoot = document.getElementById("cashflow-app");

  if (devRoot) mount(devRoot);
}

export { mount };
