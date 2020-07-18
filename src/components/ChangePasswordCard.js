import React, { Component } from 'react';
import '../css/board.css';
import '../css/alerts.css';
import serverComm from '../utils/serverComm.js';

class ChangePassword extends Component {
    constructor(props){
        super(props)
        this.handlePassChange = this.handlePassChange.bind(this);
        this.showAlert = this.showAlert.bind(this);
        this.hideAlert = this.hideAlert.bind(this);

        this.state = {
            oldP: "",
            newP1: "",
            newP2: "",
            show: false,
        }
    }

    handlePassChange = () =>{
        if (this.state.newP1 !== this.state.newP2 || this.state.newP1.length < 8){
            this.showAlert();
        } else {
            let data = {
                password: this.state.newP1,
                oldP: this.state.oldP,
            }
            let postLocat = "auth/user/update/"
            serverComm.put(data, postLocat).then((resp) => {
                return resp.json();
            }).then((resp) => {

            }).catch((resp) => {
                console.log(resp);
            });
                
            this.hideAlert();
        }
        console.log(this.state);
    }

    handleChange = (event) => {
        this.setState(
            {
                [event.target.id]: event.target.value,
            }
        );
    }

    hideAlert = () =>{
        this.setState(
            {
                value: "",
                show: false,
            }
        );
    }

    showAlert = () =>{
        this.setState(
            {
                show: true,
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
                    {this.state.show &&
                    <div className="row mt-3">
                        <div className="col-1"></div>
                        <div className="alert col-10">
                            <span className="closebtn" onClick={this.hideAlert}>&times;</span> 
                            <strong>Error!</strong> Please double check that new passwords match.
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
