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
import Page404 from './components/404Page';

import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import './css/main.css';


ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route exact path="/board" component={GamePage} />
        <Route exact path="/home" component={HomePage} />
        <Route exact path="/rules" component={RulesPage} />
        <Route exact path="/about" component={AboutPage} />
        <Route exact path="/account" component={AccountPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/" component={LandingPage} />
        <Route component={Page404} />
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
