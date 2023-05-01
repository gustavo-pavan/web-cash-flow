import React from "react";
import { Container } from "@/presentation/container";
import { Home } from "@/presentation/page/home";
import Notfound from "@/presentation/page/notfound";
import { BrowserRouter, Route, Switch } from "react-router-dom";

export default () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Container>
            <Home />
          </Container>
        </Route>
        <Route path="*">
          <Container>
            <Notfound />
          </Container>
        </Route>
      </Switch>
    </BrowserRouter>
  );
};
