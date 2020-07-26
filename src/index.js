import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import LoginPage from './components/LoginPage';
import GamePage from './components/GamePage';
import HomePage from './components/HomePage';
import RulesPage from './components/RulesPage';
import AboutPage from './components/AboutPage';
import AccountPage from './components/AccountPage';
import LandingPage from './components/LandingPage';

import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route path="/board" component={GamePage} />
        <Route path="/home" component={HomePage} />
        <Route path="/rules" component={RulesPage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/account" component={AccountPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/" component={LandingPage} />
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
