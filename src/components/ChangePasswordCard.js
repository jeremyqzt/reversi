import React, { Component } from 'react';
import '../css/board.css';
import '../css/alerts.css';
import serverComm from '../utils/serverComm.js';

class ChangePassword extends Component {
    constructor(props){
        super(props)
        this.handlePassChange = this.handlePassChange.bind(this);
        this.showErr = this.showErr.bind(this);
        this.showSucc = this.showSucc.bind(this);
        this.hideBoth = this.hideBoth.bind(this);
        this.resetFields = this.resetFields.bind(this);

        this.state = {
            oldP: "",
            errMsg: "",
            newP1: "",
            newP2: "",
            showErr: false,
            showSucc: false,

        }
    }

    handlePassChange = () =>{
        if (this.state.newP1 !== this.state.newP2) { //|| || this.state.oldP.length < 8){
            this.showErr("New Password Mismatch!");
        } else if (this.state.newP1.length < 8 ){
            this.showErr("New Password Must Must Be Atleast 8 Characters Long!");
        } else if (this.state.oldP.length < 8){
            this.showErr("Old Password is Incorrect!");
        } else {
            let data = {
                password: this.state.newP1,
                oldP: this.state.oldP,
            }
            let postLocat = "auth/user/update/"
            serverComm.put(data, postLocat).then((resp) => {
                if (resp.status >= 200 && resp.status < 300){
                    return resp.json();
                }
                return Promise.reject(resp.json())
            }).then((resp) => {
                this.showSucc();
                this.resetFields();
            }).catch((resp) => {
                resp.then((resp) => {
                    this.showErr(resp.detail);
                    this.resetFields();
                });
            });
        }
    }

    handleChange = (event) => {
        this.setState(
            {
                [event.target.id]: event.target.value,
            }
        );
    }

    showErr = (msg) =>{
        this.setState(
            {
                errMsg: msg,
                showSucc: false,
                showErr: true,
            }
        );
    }

    showSucc = () =>{
        this.setState(
            {
                showSucc: true,
                showErr: false,
            }
        );
    }

    hideBoth = () =>{
        this.setState(
            {
                showSucc: false,
                showErr: false,
            }
        );
    }

    resetFields = () => {
        this.setState(
            {
                oldP: "",
                newP1: "",
                newP2: "",
            }
        );
    }

    render(){
        return (
            <div className="card text-center h-100">
            <h5 className="card-header bg-dark text-light noSelect"><span role="img" aria-label="key">🔑‍</span> Change Password <span role="img" aria-label="key">🔑</span></h5>
                <div className="card-body">
                    <h5 className="card-title">Enter Old and New Passwords Below</h5>
                    <p className="card-text">
                        Select the change button once complete.
                    </p>
                    <div className = "row">
                    <div className="input-group mb-10 col-4">
                            <input type="password" className="form-control" id="oldP" value={this.state.oldP} onChange={this.handleChange} placeholder="Old Password" aria-label="remove" />
                            </div>
                            <div className="input-group mb-10 col-4">
                            <input type="password" className="form-control" id="newP1" value={this.state.newP1} onChange={this.handleChange} placeholder="New Password" aria-label="remove" />
                            </div>
                            <div className="input-group mb-10 col-4">
                            <input type="password" className="form-control" id="newP2" value={this.state.newP2} onChange={this.handleChange} placeholder="Re-enter New Password" aria-label="remove" />
                            <div className="input-group-append">
                                <button className="btn btn-outline-dark" onClick={this.handlePassChange} type="button">Change</button>
                            </div>
                            </div>
                    </div>
                    {this.state.showErr &&
                    <div className="row mt-3">
                        <div className="col-1"></div>
                        <div className="alert col-10">
                            <span className="closebtn" onClick={this.hideBoth}>&times;</span> 
                            <strong>Error!</strong> {this.state.errMsg}
                        </div>
                        <div className="col-1"></div>
                    </div>
                    }
                    {this.state.showSucc &&
                    <div className="row mt-3">
                        <div className="col-1"></div>
                        <div className="alert-success col-10">
                            <span className="closebtn" onClick={this.hideBoth}>&times;</span> 
                            <strong>Success!</strong> You Password has been changed!
                        </div>
                        <div className="col-1"></div>
                    </div>
                    }
                </div>
            </div>
        );
      };
}

export default ChangePassword;
