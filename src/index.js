import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';
import './index.css';
import LoginPage from './components/Login';
import Game from './components/Game';

import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route path="/board" component={Game} />
        <Route path="/" component={LoginPage} />
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
