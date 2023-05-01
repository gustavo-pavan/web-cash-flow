import React from "react";
import ReactDOM from "react-dom";
import { Container } from "../container";

const mount = (el) => {

    ReactDOM.render(<Container />, el);
  };

  
if (process.env.NODE_ENV === "development") {
  const devRoot = document.getElementById("cashflow-app");

  if (devRoot) mount(devRoot);
}

export { mount };
