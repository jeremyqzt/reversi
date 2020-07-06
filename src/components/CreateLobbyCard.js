import React, { Component } from 'react';
import axios from 'axios';
import JwtUtils from '../utils/jwtUtils.js';

import '../css/board.css';

class CreateLobbyCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            room: "No Room",
            playerB: "...",
            playerW: "...",
            inLobby: true,
            compMounted: false,
        }
        this.handleJoin = this.handleJoin.bind(this);
        this.handleLobbyUpdate = this.handleLobbyUpdate.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
        this.handleLeave = this.handleLeave.bind(this);
        // eslint-disable-next-line
    }
    componentDidMount(){
        this.setState({
            room: "No Room",
            playerB: "...",
            playerW: "...",
            inLobby: true,
            compMounted: true,
        });
        this.handleLobbyUpdate();
        var intervalID = setInterval(this.handleLobbyUpdate, 2500);
    }


    setPlayers(pArr, room){
        let pB = pArr[0].split("@")[0];
        let pW = (pArr.length > 1)? pArr[1].split("@")[0]: "...";
        let inLobby = false;

        if (room !== undefined){
            inLobby = true;
        }

        this.setState({
            playerB: pB,
            playerW: pW,
            room: room,
            inLobby: inLobby,
        })
    }

    handleLeave = (event) => {
        event.preventDefault();
        let postLocat = "lobby/room/";

        const instance = axios.create({baseURL: 'http://127.0.0.1:8000'})
        const token = `JWT ${JwtUtils.getAccessToken()}`;
        instance.post(postLocat, {
            gid: this.state.room,
            join: false,
        },
        {
            headers: {
              'Content-Type': 'application/json',
              'Accept' : 'application/json',
              'Authorization': token,
            },
        })
        .then((result) => {
            this.resetState();
        })
        .catch((result)=> {
            console.log(result);
        });
    }

    handleJoin = (event) => {
        event.preventDefault();
        let postLocat = "lobby/room/";
        let roomVal = document.getElementById('room').value;

        const instance = axios.create({baseURL: 'http://127.0.0.1:8000'})
        const token = `JWT ${JwtUtils.getAccessToken()}`;
        instance.post(postLocat, {
            gid: roomVal,
            join: true,
        },
        {
            headers: {
              'Content-Type': 'application/json',
              'Accept' : 'application/json',
              'Authorization': token,
            },
        })
        .then((result) => {
            this.handleLobbyUpdate();
        })
        .catch((result)=> {
            alert("No Such Room");
        });
    }

    handleLobbyUpdate = () => {
        let roomLocat = "lobby/room/";

        const instance = axios.create({baseURL: 'http://127.0.0.1:8000'})
        const token = `JWT ${JwtUtils.getAccessToken()}`;

        instance.get(roomLocat,
            {
                //params: {
                //    gid: this.state.room,
                //},
                headers: {
                    'Content-Type': 'application/json',
                    'Accept' : 'application/json',
                    'Authorization': token,
                },
            })
        .then((result) => {
            console.log(result)
            if (Object.keys(result.data).length !== 0){
                this.setPlayers(result.data.users, result.data.room);
            } else {
                this.resetState();
            }
        })
        .catch((result)=> {
            console.log(result);
        });     
    }

    resetState(){
        this.setState({
            playerB: "...",
            playerW: "...",
            room: "None",
            inLobby: false,
        });
    }

    handleCreate = (event) => {
        event.preventDefault();
        let postLocat = "lobby/createroom/";

        const instance = axios.create({baseURL: 'http://127.0.0.1:8000'})
        const token = `JWT ${JwtUtils.getAccessToken()}`;
        instance.post(postLocat, {},
          {
            headers: {
              'Content-Type': 'application/json',
              'Accept' : 'application/json',
              'Authorization': token,
            },
          })
        .then((result) => {
            this.handleLobbyUpdate();
        })
        .catch((result)=> {
            console.log(result);
        });
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
                                <button href="/" onClick={this.handleCreate}  className="btn btn-outline-dark w-100" disabled={this.state.inLobby && this.state.compMounted}>Create</button>
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
                            <input type="text" className="form-control" id="room" placeholder="Enter ID" aria-label="opp" aria-describedby="basic-addon2" />
                            <div className="input-group-append">
                                <button className="btn btn-outline-secondary" type="button" onClick={this.handleJoin} disabled={this.state.inLobby && this.state.compMounted}>Join Room</button>
                            </div>
                            </div>
                            <div className="col-1"></div>
                        </div>
                    </div>
                </div>
                <div className="col-6">
                    <div className="card-body">
                        <h5 className="card-title">Current: {this.state.room}</h5>
                        <p className="card-text noSelect"><span role="img" aria-label="blackCircle">⚫</span> {this.state.playerB} Vs. <span role="img" aria-label="whiteCircle"> {this.state.playerW}⚪</span></p>
                        <div className="row">
                            <div className="col-1"></div>
                            <div className="col-5">
                                <button href="/" className="btn btn-outline-danger w-100" onClick={this.handleLeave} disabled={!this.state.inLobby && this.state.compMounted}>Leave</button>
                            </div>
                            <div className="col-5">
                                <button href="/" className="btn btn-outline-success w-100" disabled={!this.state.inLobby && this.state.compMounted}>Start</button>
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