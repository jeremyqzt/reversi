import React, { Component } from 'react';
import Nav from './Nav';
import CreateLobbyCard from './CreateLobbyCard';
import JoinLobbyCard from './JoinLobbyCard';

import '../css/board.css';

class Home extends Component {
    render(){
        return (
            <div>           
                <Nav />
                <div class="container mt-1">
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

export default Home;
