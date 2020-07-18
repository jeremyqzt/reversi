import React, { Component } from 'react';
import '../css/board.css';
import '../css/alerts.css';
import serverComm from '../utils/serverComm.js';
import JwtUtils from '../utils/jwtUtils.js';
import beepSound from '../sound/beep.wav';

class DeleteAccountCard extends Component {
    constructor(props){
        super(props)
        this.handleDelete = this.handleDelete.bind(this);
        this.showAlert = this.showAlert.bind(this);
        this.hideAlert = this.hideAlert.bind(this);
        this.showSucc = this.showSucc.bind(this);
        this.goHome = this.goHome.bind(this);
        this.placeBeepSound = this.placeBeepSound.bind(this);

        this.state = {
            value: "",
            show: false,
            errMsg: "",
        }
    }

    handleDelete = () =>{
        let deleteMe = this.state.value.trim();
        let postLocat = "auth/user/delete/"
        if (deleteMe === "DELETE ACCOUNT"){
            serverComm.delete({}, postLocat)
            .then((result) => {
                if (result.status >= 200 && result.status < 300){
                    return result.json();
                }
                return Promise.reject(result.json());
            }).then((result) => {
                this.showSucc();
                JwtUtils.deleteToken();
                this.goHome();
            }).catch((result) => {
                result.then((result) => {
                    this.showAlert("Deletion Failed, Please Try Again Later.");
                })
            });
        } else {
            this.showAlert("Please double check that 'DELETE ACCOUNT' was entered correctly.");
        }
    }

    placeBeepSound =()=>{
        var beep = new Audio (beepSound);
        beep.play();
    }

    async goHome() {
        for (let i = 0; i < 3; i++){
            this.placeBeepSound();
            await new Promise(r => setTimeout(r, 1000));
        }
        window.location.href = '/';
    }

    handleChange = event => {
        this.setState({value: event.target.value});
    }

    showSucc = () => {
        this.setState(
            {
                value: "",
                show: false,
                doneShow: true,
            }
        );    
    }

    hideAlert = () =>{
        this.setState(
            {
                value: "",
                show: false,
                doneShow: false,
            }
        );
    }

    showAlert = (msg) =>{
        this.setState(
            {
                errMsg: msg,
                show: true,
            }
        );
    }

    render(){
        return (
            <div className="card text-center h-100">
            <h5 className="card-header bg-dark text-light noSelect"><span role="img" aria-label="del">❌‍</span> Delete Your Account <span role="img" aria-label="del">❌‍</span></h5>
                <div className="card-body">
                    <h5 className="card-title">Permeanently Delete Your Account</h5>
                    <p className="card-text">
                        Enter <i><strong>DELETE ACCOUNT</strong></i> below and click the delete button.
                    </p>
                    <div className = "row">
                        <div className="col-1"></div>
                            <div className="input-group mb-10 col-10">
                            <input type="text" className="form-control" id="verify" value={this.state.value} onChange={this.handleChange} placeholder="Enter 'DELETE ACCOUNT' Here" aria-label="remove" />
                            <div className="input-group-append">
                                <button className="btn btn-outline-danger" onClick={this.handleDelete} type="button">Delete</button>
                            </div>
                            </div>
                        <div className="col-1"></div>
                    </div>
                    {this.state.show &&
                    <div className="row mt-3">
                        <div className="col-1"></div>
                        <div className="alert col-10">
                            <span className="closebtn" onClick={this.hideAlert}>&times;</span> 
                            <strong>Error!</strong> {this.state.errMsg}
                        </div>
                        <div className="col-1"></div>
                    </div>
                    }
                    {this.state.doneShow &&
                    <div className="row mt-3">
                        <div className="col-1"></div>
                        <div className="alert-success col-10">
                            <span className="closebtn" onClick={this.hideAlert}>&times;</span> 
                            <strong>Success!</strong> Account Deleted, You Will be Redirected in 3 Seconds.
                        </div>
                        <div className="col-1"></div>
                    </div>
                    }
                </div>
            </div>
        );
      };
}

export default DeleteAccountCard;
