import React, { Component } from 'react';
import axios from 'axios';

import '../css/login.css';
import JwtUtils from '../utils/jwtUtils.js';

class LoginPage extends Component {
  constructor() {
    super(); 
    this.state = {
      signup: false,
      login: "Sign In",
      email: '',
      password: '',
      passwordConfirm: '',
     }

     this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = (event) => {
    event.preventDefault();
    // eslint-disable-next-line
    const {signup, login, email, password, passwordConfirm} = this.state;

    if (password.length < 8) {
      let err = "Password too short!";
      this.setState({
        login: err,
      });
      return;
    }
    if ((password !== passwordConfirm && signup)){
      let err = "Password mismatch!";
      this.setState({
        login: err,
      });
      return;
    }
    let postLocat = (signup) ? "/auth/user/create/" : "auth/token/obtain/";

    const instance = axios.create({baseURL: 'http://127.0.0.1:8000'})
    instance.post(postLocat, 
      {
        headers: {
          'Content-Type': 'application/json'
        },
        "username": email,
        "email": email,
        "password": password
      })
    .then((result) => {
      let token = result.data;
      JwtUtils.storeToken(token);
      window.location.href = '/home';
    })
    .catch((result)=> {
      console.log(result);
    });

  }

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  }

  _checkSignup = (bool) => {
    let msg = "Sign In"

    if (this.refs.signupCheck.checked){
      msg = "Sign Up!"
    }

    this.setState({
      signup: this.refs.signupCheck.checked,
      login: msg,
    });
  }

  render(){
    return (
      <div>
        <body>
          <div className="d-flex fullScreen">
            <form className="white-background justify-content-center center text-center border border-light p-5 shadow" onSubmit={this.handleSubmit}>
                <p className="h2 noSelect">Reversi</p>
                <p className="mb-4 noSelect">{this.state.login}</p>
                <input type="email" id="email" className="form-control mb-4" placeholder="E-mail" value={this.email} onChange={this.onChange} />
                <input type="password" id="password" className="form-control mb-4" placeholder="Password" value={this.pwd1} onChange={this.onChange} />
                {this.state.signup && <input type="password" id="passwordConfirm" className="form-control mb-4" placeholder="Confirm Password" value={this.passwordConfirm} onChange={this.onChange} />}
              <button className="btn btn-primary btn-block my-4" type="submit">Sign In/Up</button>
                <div className="d-flex justify-content-around mb-3">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" ref="signupCheck" onClick={this._checkSignup} className="custom-control-input" id="signup" checked={this.state.signup} />
                        <label className="custom-control-label" for="signup">Create This Account</label>
                    </div>
                </div>
                <a href="/">Continue As Guest</a>
            </form>
          </div>
        </body>
      </div>
    );
  };
}

export default LoginPage;
