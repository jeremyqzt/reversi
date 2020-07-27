import React, { Component } from 'react';

import '../css/login.css';
import JwtUtils from '../utils/jwtUtils.js';
import serverComm from '../utils/serverComm.js';

class LoginPage extends Component {
  constructor() {
    super(); 
    this.state = {
      signup: false,
      login: "Sign In",
      email: '',
      password: '',
      passwordConfirm: '',
      checkingToken: false,
     }

     this.handleSubmit = this.handleSubmit.bind(this);
     this.checkJWTToken = this.checkJWTToken.bind(this);

  }

  componentDidMount = () =>{
    this.checkJWTToken();
  }

  checkJWTToken = () => {
    this.setState({
      checkingToken: true,
    });
    let postLocat = "auth/token/check";
    serverComm.get(postLocat)
    .then((result) => {
      if (result.status === 200){
        window.location.href = '/home';
      } else {
        this.setState({
          checkingToken: false,
        });
      }
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    // eslint-disable-next-line
    const {signup, _, email, password, passwordConfirm} = this.state;

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
    this.tryLoginOrSignUp(signup, email, password);
  }

  getTempToken = () => {
    let postLocat = "auth/token/temp/";
    serverComm.post({}, postLocat).then((result) => {return result.json()})
    .then((result) => {
      JwtUtils.storeToken(result);
      window.location.href = '/home';
    });
  }

  tryLoginOrSignUp(signup, email, password){
    let postLocat = (signup) ? "auth/user/create/" : "auth/token/obtain/";
    let data = {
      "username": email,
      "email": email,
      "password": password
    };
    serverComm.post(data, postLocat)
    .then(result =>{
      if (result.status >= 200 && result.status < 300){
        return result.json()
      }
      return Promise.reject(result.json());
    })
    .then((result) => {
      if (!signup){
        JwtUtils.storeToken(result);
        window.location.href = '/home';
      } else {
        this.tryLoginOrSignUp(!signup, email, password);
      }
    })
    .catch((result)=> {
      console.log(result)
      result.then((result) =>{
        this.setState({
          login: result.detail,
        });
      })
    });
  }

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  }

  _checkSignup = (e) => {
    let msg = "Sign In"

    if (e.target.checked){
      msg = "Sign Up!"
    }

    this.setState({
      signup: e.target.checked,
      login: msg,
    });
  }

  render(){
    return (
      <div>
          <div className="d-flex fullScreen">
             <form className="white-background justify-content-center center text-center border border-light p-5 shadow" onSubmit={this.handleSubmit}>
                <p className="h2 noSelect">Reversi</p>
                <p className="mb-4 noSelect">{this.state.login}</p>
                <input type="email" id="email" className="form-control mb-4" placeholder="E-mail" value={this.state.email} onChange={this.onChange} />
                <input type="password" id="password" className="form-control mb-4" placeholder="Password" value={this.state.pwd1} onChange={this.onChange} />
                {this.state.signup && <input type="password" id="passwordConfirm" className="form-control mb-4" placeholder="Confirm Password" value={this.passwordConfirm} onChange={this.onChange} />}
                {!this.state.checkingToken && <button className="btn btn-dark btn-block my-4" type="submit">Sign In/Up</button>}
                {this.state.checkingToken && <div className="spinner-border" role="status"><span className="sr-only">Loading...</span></div>}
                <div className="d-flex justify-content-around mb-3">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" onChange={this._checkSignup} className="custom-control-input" id="signup" checked={this.state.signup} />
                        <label className="custom-control-label" htmlFor="signup">Create This Account</label>
                    </div>
                </div>
            </form>
          </div>
      </div>
    );
  };
}

export default LoginPage;
