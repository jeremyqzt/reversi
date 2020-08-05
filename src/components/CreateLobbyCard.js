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
            readyToStart: false,
            invalidRoom: "",
        }
        this.handleJoin = this.handleJoin.bind(this);
        this.handleLobbyUpdate = this.handleLobbyUpdate.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
        this.handleLeave = this.handleLeave.bind(this);
        this.handleGameStart = this.handleGameStart.bind(this);
        this.runLobbyCheckLoop = this.runLobbyCheckLoop.bind(this);

    }

    handleGameStart = () => {
        let postLocat = "api/game/start/"
        serverComm.post({}, postLocat)
        .then(result => {return result.json();})
        .then((result) => {
            window.location.href = "/board?mode=5";
        })
        .catch((result)=> {
            console.log(result);
        });        
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
        this.runLobbyCheckLoop();
    }

    async runLobbyCheckLoop(){
        this.handleLobbyUpdate();
        await new Promise(r => setTimeout(r, 2500));
        this.runLobbyCheckLoop();
    }


    setPlayers(pArr, room, me){
        let pB = pArr[0].split("@")[0];
        let pW = (pArr.length > 1)? pArr[1].split("@")[0]: "...";
        let inLobby = false;
        let readyToStart = false;
        if (room !== undefined){
            inLobby = true;
        }

        if (pArr.length >= 2 && me === pArr[0]){
            readyToStart = true;
        }

        this.setState({
            playerB: pB,
            playerW: pW,
            room: room,
            inLobby: inLobby,
            readyToStart: readyToStart,
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

        this.setState({
            invalidRoom: "",
        });

        let roomVal = document.getElementById('room').value;
        let data = {
            gid: roomVal,
            join: true,
        };

        serverComm.post(data, postLocat)
        .then(result =>{
            if(result.status >= 200 || result.status < 300){
                return result.json()
            }
            return Promise.reject(result);
        })
        .then((result) => {
            this.handleLobbyUpdate();
        })
        .catch((result)=> {
            this.setState({
                invalidRoom: "is-invalid",
            });
        });
    }

    handleLobbyUpdate = () => {
        let roomLocat = "lobby/room/";
        serverComm.get(roomLocat)
        .then(result =>{return result.json()})
        .then((result) => {
            //console.log(result)
            if (Object.keys(result).length > 1){
                this.setPlayers(result.users, result.room, result.you);
                if(result.started){
                    if (result.started.length < 2){
                        if (!(result.started.includes(result.you))){
                            this.handleGameStart();
                        }
                    }
                }
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
            readyToStart: false,
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
                            <div className="col-1"></div>
                            <div className="col-10">
                                <button onClick={this.handleCreate}  className="btn btn-outline-dark w-100" disabled={this.state.inLobby || !this.state.compMounted}>Create</button>
                            </div>
                            <div className="col-1"></div>
                        </div>
                    </div>
                </div>
                <div className="col-3">
                    <div className="card-body">
                        <h5 className="card-title">Join a Room</h5>
                        <p className="card-text">{this.state.invalidRoom === "" ? "Enter Room": "Invalid Room"}</p>
                        <div className="row">
                            <div className="col-1"></div>
                            <div className="input-group mb-10">
                            <input type="text" className={`form-control ${this.state.invalidRoom}`} id="room" placeholder="Enter ID" aria-label="opp" aria-describedby="basic-addon2" />
                            <div className="input-group-append">
                                <button className="btn btn-outline-secondary" type="button" onClick={this.handleJoin} disabled={this.state.inLobby || !this.state.compMounted}>Join Room</button>
                            </div>
                            </div>
                            <div className="col-1"></div>
                        </div>
                    </div>
                </div>
                <div className="col-6">
                    <div className="card-body">
                        <h5 className="card-title">Current: {this.state.room}</h5>
                        <p className="card-text noSelect"><span role="img" aria-label="blackCircle">⚫</span> {this.state.playerB} {this.state.inLobby && <span role="img" aria-label="crown">(👑) </span>} Vs. <span role="img" aria-label="whiteCircle"> {this.state.playerW}⚪</span></p>
                        <div className="row">
                            <div className="col-2"></div>
                            <div className="col-4">
                                <button className="btn btn-outline-danger w-100" onClick={this.handleLeave} disabled={!this.state.inLobby || !this.state.compMounted}>Leave</button>
                            </div>
                            <div className="col-4">
                                <button onClick={this.handleGameStart} className="btn btn-outline-success w-100" disabled={!this.state.inLobby  || !this.state.readyToStart ||  !this.state.compMounted}>Start</button>
                            </div>
                            <div className="col-2"></div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        );
      };
}

export default CreateLobbyCard;