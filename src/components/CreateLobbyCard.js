import React, { Component } from 'react';

import '../css/board.css';

class CreateLobbyCard extends Component {
    render(){
        return (
            <div className="card text-center h-100">
            <h5 className="card-header bg-dark text-light noSelect"><span role="img" aria-label="multi">⚔️</span> Multiplayer - Start a Lobby</h5>
            <div className="row">
                <div className="col-3">
                    <div className="card-body">
                        <h5 className="card-title">Create a Room</h5>
                        <p className="card-text">For others to join!</p>
                        <div className="row">
                            <div className="col-3"></div>
                            <div className="col-6">
                                <a href="/" className="btn btn-outline-dark w-100">Create</a>
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
                            <input type="text" className="form-control" placeholder="Enter ID" aria-label="opp" aria-describedby="basic-addon2" />
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
                        <p className="card-text"><span role="img" aria-label="blackCircle">⚫</span> ... Vs. <span role="img" aria-label="whiteCircle">...⚪</span></p>
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