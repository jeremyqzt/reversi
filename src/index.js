import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './index.css';
import LoginPage from './components/LoginPage';
import GamePage from './components/GamePage';
import HomePage from './components/HomePage';
import RulesPage from './components/RulesPage';

import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route path="/board" component={GamePage} />
        <Route path="/home" component={HomePage} />
        <Route path="/rules" component={RulesPage} />
        <Route path="/" component={LoginPage} />
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
