import React, { Component } from 'react';

import '../css/board.css';

class JoinLobbyCard extends Component {
    render(){
        return (
            <div className="card text-center h-100">
            <h5 className="card-header bg-dark text-light noSelect"><span role="img" aria-label="multi">🛡️</span> Multiplayer - Join a Lobby</h5>
            <div className="card-body">
                <h5 className="card-title">Join a Room</h5>
                <p className="card-text">Join an existing room</p>
                <div className="row">
                    <div className="col-1"></div>
                    <div className="col-10">
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" placeholder="Enter Room ID" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                            <div className="input-group-append">
                                <button className="btn btn-outline-secondary" type="button">Join Room</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-1"></div>
                </div>
            </div>
            </div>
        );
      };
}

export default JoinLobbyCard;

/*
*/