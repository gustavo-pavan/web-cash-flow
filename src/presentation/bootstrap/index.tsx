import React from "react";
import ReactDOM from "react-dom";
import { Home } from "../home";
import { Container } from "../container";

const mount = (el) => {

    ReactDOM.render(<Container><Home /></Container>, el);
  };

  
if (process.env.NODE_ENV === "development") {
  const devRoot = document.getElementById("cashflow-app");

  if (devRoot) mount(devRoot);
}

export { mount };
