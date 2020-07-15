import React, { Component } from 'react';
import Nav from './Nav';
import CreateLobbyCard from './CreateLobbyCard';
import BasicCard from './BasicCard';
import AiCard from './AiCard';

import '../css/board.css';
import '../css/home.css';

class Home extends Component {
    render(){
        let aiRenderDetails = {
            bigTitle: "1️⃣ Single Player",
            smallTitle: "🤖 Against the AI.",
            description: "Play Reversi Against a Computer Player.",
            hrefEasy: "/board?ai=1",
            navMsgEasy: "🍂 EZ",
            hrefMed: "/board?ai=2",
            navMsgMed: "🌱 Okay",
            hrefHard: "/board?ai=3",
            navMsgHard: "🌲 !!!!",
        };

        let twoPlayerRenderDetails = {
            bigTitle: "2️⃣ Local Multiplayer",
            smallTitle: "🎎 Against a Friend.",
            description: "Play Reversi Against Someone Sitting Next to You.",
            href: "/",
            navMsg: "Get Started!",
        };

        let ruleDetails = {
            bigTitle: "📖 Reversi Rules",
            smallTitle: "",
            description: "Read up on Game Rules.",
            href: "/",
            navMsg: "Show Me",
        };

        let accountDetails = {
            bigTitle: "🔒 Account Management",
            smallTitle: "",
            description: "Make Edits to Your Account.",
            href: "/",
            navMsg: "Make Edits",
        };

        let aboutDetails = {
            bigTitle: "📇 Contact Us",
            smallTitle: "",
            description: "See Any Bugs? Contact Us.",
            href: "/",
            navMsg: "Contact",
        };
        return (
            <div>           
                <Nav />
                <div className="container mt-1">
                        <div className="row mt-4 fade-in to-be-animated" style={{animationDelay: "1s"}}>
                            <div className="col-12">
                                <CreateLobbyCard />
                            </div>
                        </div>
                        <div className="row mt-4 fade-in to-be-animated" style={{animationDelay: "0.5s"}}>
                            <div className="col-6">
                                <AiCard renderDetails={aiRenderDetails} />
                            </div>
                            <div className="col-6">
                                <BasicCard renderDetails={twoPlayerRenderDetails} />
                            </div>
                        </div>
                        <div className="row mt-4 fade-in to-be-animated">
                            <div className="col-4">
                                <BasicCard renderDetails={ruleDetails} />
                            </div>
                            <div className="col-4">
                                <BasicCard renderDetails={accountDetails} />
                            </div>
                            <div className="col-4">
                                <BasicCard renderDetails={aboutDetails} />
                            </div>
                        </div>
                    </div>
            </div>
        );
      };
}

export default Home;
