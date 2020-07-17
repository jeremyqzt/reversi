import React, { Component } from 'react';
import serverComm from '../utils/serverComm.js';

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
        // eslint-disable-next-line
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

        let data = {
            gid: this.state.room,
            join: false,
        };
        serverComm.post(data, postLocat)
        .then(result => {return result.json();})
        .then((result) => {
            this.resetState();
            this.handleLobbyUpdate();
        })
        .catch((result)=> {
            console.log(result);
        });
    }

    handleJoin = (event) => {
        event.preventDefault();
        let postLocat = "lobby/room/";
        let roomVal = document.getElementById('room').value;
        let data = {
            gid: roomVal,
            join: true,
        };

        serverComm.post(data, postLocat)
        .then(result =>{return result.json()})
        .then((result) => {
            this.handleLobbyUpdate();
        })
        .catch((result)=> {
            alert("No Such Room");
        });
    }

    handleLobbyUpdate = () => {
        let roomLocat = "lobby/room/";
        serverComm.get(roomLocat)
        .then(result =>{return result.json()})
        .then((result) => {
            if (Object.keys(result).length !== 0){
                this.setPlayers(result.users, result.room);
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
        serverComm.post({}, postLocat)
        .then(result =>{return result.json()})
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
                                <button onClick={this.handleCreate}  className="btn btn-outline-dark w-100" disabled={this.state.inLobby && this.state.compMounted}>Create</button>
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
                                <button className="btn btn-outline-danger w-100" onClick={this.handleLeave} disabled={!this.state.inLobby && this.state.compMounted}>Leave</button>
                            </div>
                            <div className="col-5">
                                <button href="/board?mode=0" className="btn btn-outline-success w-100" disabled={!this.state.inLobby && this.state.compMounted}>Start</button>
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