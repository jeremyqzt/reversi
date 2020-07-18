import React, { Component } from 'react';
import '../css/board.css';
import '../css/alerts.css';

class DeleteAccountCard extends Component {
    constructor(props){
        super(props)
        this.handleDelete = this.handleDelete.bind(this);
        this.showAlert = this.showAlert.bind(this);
        this.hideAlert = this.hideAlert.bind(this);

        this.state = {
            value: "",
            show: false,
        }
    }

    handleDelete = () =>{
        let deleteMe = this.state.value.trim();
        if (deleteMe === "DELETE ACCOUNT"){
            this.hideAlert();
        } else {
            this.showAlert();
        }
    }

    handleChange = event => {
        this.setState({value: event.target.value});
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
                            <strong>Error!</strong> Please double check that 'DELETE ACCOUNT' was entered correctly.
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
