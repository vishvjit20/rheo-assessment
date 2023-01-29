import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/Home";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route src="/" component={Home} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
