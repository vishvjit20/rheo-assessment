import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import BookMovie from "./components/BookMovie";
import Home from "./components/Home";
import InitialSeatingArrangementSetup from "./components/InitialSeatingArrangementSetup";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/movie/:id" component={BookMovie} exact />
        <Route
          path="/movie/:id/rows"
          component={InitialSeatingArrangementSetup}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
