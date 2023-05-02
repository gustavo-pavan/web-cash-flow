import React from "react";
import { Container } from "@/presentation/container";
import { Home } from "@/presentation/page/home";
import Notfound from "@/presentation/page/notfound";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ParameterFactory } from "@/main/factory/page/parameter";
import { RecoilRoot } from "recoil";

export default () => {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Container>
              <Home />
            </Container>
          </Route>
          <Route exact path="/parameter">
            <Container>
              <ParameterFactory />
            </Container>
          </Route>
          <Route path="*">
            <Container>
              <Notfound />
            </Container>
          </Route>
        </Switch>
      </BrowserRouter>
    </RecoilRoot>
  );
};
