import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import BookingSummary from "./components/BookingSummary";
import BookMovie from "./components/BookMovie";
import Home from "./components/Home";
import InitialSeatingArrangementSetup from "./components/InitialSeatingArrangementSetup";
import NavigationBar from "./components/NavigationBar";
import Rows from "./components/Rows";

const App = () => {
  return (
    <BrowserRouter>
      <NavigationBar />
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/movie/:id" component={BookMovie} exact />
        <Route
          path="/movie/:id/customize-rows"
          component={InitialSeatingArrangementSetup}
        />
        <Route path="/movie/:id/rows" component={Rows} />
        <Route path="/payment/:id" component={BookingSummary} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
