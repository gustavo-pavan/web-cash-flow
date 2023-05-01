import React from "react";
import ReactDOM from "react-dom";
import { Home } from "../home";

const mount = (el) => {

    ReactDOM.render(<Home />, el);
  };

  
if (process.env.NODE_ENV === "development") {
  const devRoot = document.getElementById("cashflow-app");

  if (devRoot) mount(devRoot);
}

export { mount };
