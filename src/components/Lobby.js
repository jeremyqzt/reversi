import React, { Component } from 'react';
import Nav from './Nav';
import CreateLobbyCard from './CreateLobbyCard';
import JoinLobbyCard from './JoinLobbyCard';

import '../css/board.css';

class Lobby extends Component {
    render(){
        return (
            <div>           
                <Nav />
                <div className="container mt-4 mb-4">
                    <h1 className="text-center noSelect"><span role="img" aria-label="blackCircle">⚫</span>Reversi Game Lobby<span role="img" aria-label="whiteCircle">⚪</span></h1>
                </div>
                <div class="container">
                        <div class="row mt-4">
                            <div class="col-6">
                                <CreateLobbyCard />
                            </div>
                            <div class="col-6">
                                <JoinLobbyCard />
                            </div>
                        </div>
                    </div>
            </div>
        );
      };
}

export default Lobby;
