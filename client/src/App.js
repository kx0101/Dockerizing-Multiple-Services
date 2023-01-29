import './App.css';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Fib } from './Fib.js';
import { OtherPage } from "./OtherPage.js";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/">
          <Fib />
        </Route>
        <Route path="/otherpage">
          <OtherPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
