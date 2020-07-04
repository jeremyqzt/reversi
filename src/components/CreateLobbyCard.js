import React, { Component } from 'react';

import '../css/board.css';

class CreateLobbyCard extends Component {
    render(){
        return (
            <div className="card text-center h-100">
            <h5 className="card-header bg-dark text-light noSelect"><span role="img" aria-label="multi">⚔️</span> Multiplayer - Start a Lobby</h5>
            <div className="card-body">
                <h5 className="card-title">Create a Room</h5>
                <p className="card-text">Create a room for others to join</p>
                <div className="row">
                    <div className="col-3"></div>
                    <div className="col-6">                
                        <a href="/" className="btn btn-outline-dark w-100">Create a Room</a>
                    </div>
                    <div className="col-3"></div>
                </div>
            </div>
            </div>
        );
      };
}

export default CreateLobbyCard;

/*
*/