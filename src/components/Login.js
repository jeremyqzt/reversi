import React, { Component } from 'react';
import '../css/login.css';

class LoginPage extends Component {
  constructor() {
    super(); 
    this.state = {
      signup: false,
      login: "Sign In",
     }
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
            <form className="white-background justify-content-center center text-center border border-light p-5 shadow" action="#!">
                <p className="h2">Reversi</p>
                <p className="mb-4">{this.state.login}</p>
                <input type="email" id="email" className="form-control mb-4" placeholder="E-mail" />
                <input type="password" id="password" className="form-control mb-4" placeholder="Password" />
                {this.state.signup && <input type="password" id="passwordConfirm" className="form-control mb-4" placeholder="Confirm Password" />}
              <button className="btn btn-primary btn-block my-4" type="submit">{this.state.login}</button>
                <div className="d-flex justify-content-around mb-3">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" ref="signupCheck" onClick={this._checkSignup} className="custom-control-input" id="createAcc" checked={this.state.signup} />
                        <label className="custom-control-label" for="createAcc">Create This Account</label>
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
