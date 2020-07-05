import React, { Component } from 'react';
import axios from 'axios';
import JwtUtils from '../utils/jwtUtils.js';

import '../css/board.css';

class CreateLobbyCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            room: "",
            playerB: "...",
            playerW: "...",
        }
        this.handleJoin = this.handleJoin.bind(this);
        this.handleLobbyUpdate = this.handleLobbyUpdate.bind(this);
        this.handleCreate = this.handleCreate.bind(this);

    }

    handleJoin = (event) => {
        event.preventDefault();
    }

    handleLobbyUpdate = () => {

    }

    handleCreate = (event) => {
        event.preventDefault();
        let postLocat = "lobby/createroom/";

        const instance = axios.create({baseURL: 'http://127.0.0.1:8000'})
        const token = `JWT ${JwtUtils.getAccessToken()}`;
        console.log(token);
        instance.post(postLocat, {},
          {
            headers: {
              'Content-Type': 'application/json',
              'Accept' : 'application/json',
              'Authorization': token,
            },
          })
        .then((result) => {
            console.log(result);
        })
        .catch((result)=> {
            console.log(result);
        });     
    }

    __getAllUsers(){
        let postLocat = "lobby/room/";

        const instance = axios.create({baseURL: 'http://127.0.0.1:8000'})
        instance.post(postLocat, 
          {
            headers: {
              'Content-Type': 'application/json'
            },
            "gid": "test",
          })
        .then((result) => {
            console.log(result);
        })
        .catch((result)=> {
            console.log(result);
        });       
    }

    onChange = (e) => {
        this.setState({ [e.target.id]: e.target.value });
    }

    render(){
        return (
            <div className="card text-center h-100">
            <h5 className="card-header bg-dark text-light noSelect"><span role="img" aria-label="multi">⚔️</span> Multiplayer - Start a Lobby <span role="img" aria-label="multi">🛡️</span></h5>
            <div className="row">
                <div className="col-3">
                    <div className="card-body">
                        <h5 className="card-title">Create a Room</h5>
                        <p className="card-text">For others to join!</p>
                        <div className="row">
                            <div className="col-3"></div>
                            <div className="col-6">
                                <a href="/" className="btn btn-outline-dark w-100" onClick={this.handleCreate}>Create</a>
                            </div>
                            <div className="col-3"></div>
                        </div>
                    </div>
                </div>
                <div className="col-3">
                    <div className="card-body">
                        <h5 className="card-title">Join a Room</h5>
                        <p className="card-text">To face a opponent!</p>
                        <div className="row">
                            <div className="col-1"></div>
                            <div className="input-group mb-10">
                            <input type="text" className="form-control" id="room" placeholder="Enter ID" aria-label="opp" aria-describedby="basic-addon2" onChange={this.onChange} value={this.state.room} />
                            <div className="input-group-append">
                                <button className="btn btn-outline-secondary" type="button">Join Room</button>
                            </div>
                            </div>
                            <div className="col-1"></div>
                        </div>
                    </div>
                </div>
                <div className="col-6">
                    <div className="card-body">
                        <h5 className="card-title">Current Room</h5>
                        <p className="card-text noSelect"><span role="img" aria-label="blackCircle">⚫</span> {this.state.playerB} Vs. <span role="img" aria-label="whiteCircle"> {this.state.playerW}⚪</span></p>
                        <div className="row">
                            <div className="col-1"></div>
                            <div className="col-5">
                                <a href="/" className="btn btn-outline-danger w-100">Leave</a>
                            </div>
                            <div className="col-5">
                                <a href="/" className="btn btn-outline-success w-100">Start</a>
                            </div>
                            <div className="col-1"></div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        );
      };
}

export default CreateLobbyCard;

/*
*/