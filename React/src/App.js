import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Login from "./components/Login";
import Main from "./components/main";

class App extends Component {
  render() {
    return (
    

        <div className="container mt-3">
          <Switch>
            
            <Route exact path="/login" component={Login} />
            <Route path="/" component={Main} />
          </Switch>
        </div>
      // </div>
    );
  }
}

export default App;
