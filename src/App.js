import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import BookingSummary from "./pages/BookingSummary/BookingSummary";
import BookMovie from "./pages/BookMovie/BookMovie";
import Home from "./pages/Home/Home";
import TicketArrangements from "./pages/TicketArrangements/TicketArrangementSetup";
import NavigationBar from "./components/Navigation/NavigationBar";
import Rows from "./pages/TicketArrangements/Rows";

const App = () => {
  return (
    <BrowserRouter>
      <NavigationBar />
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/movie/:id" component={BookMovie} exact />
        <Route
          path="/movie/:id/customize-rows"
          component={TicketArrangements}
        />
        <Route path="/movie/:id/rows" component={Rows} />
        <Route path="/payment/:id" component={BookingSummary} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
