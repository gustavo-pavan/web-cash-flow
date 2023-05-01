import React from "react";
import ReactDOM from "react-dom";

const mount = (el) => {
    ReactDOM.render(<h1>Test</h1>, el);
  };

  
if (process.env.NODE_ENV === "development") {
  const devRoot = document.getElementById("cashflow-app");

  if (devRoot) mount(devRoot);
}

export { mount };
