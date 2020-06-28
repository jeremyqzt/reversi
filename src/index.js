import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import LoginPage from './components/Login';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <LoginPage />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
