import React, { Component } from 'react';
import Nav from './Nav';
import CreateLobbyCard from './CreateLobbyCard';
import BasicCard from './BasicCard';
import AiCard from './AiCard';
import JwtUtils from '../utils/jwtUtils';

import '../css/board.css';
import '../css/home.css';

class HomePage extends Component {
    constructor(props){
        super(props)
        JwtUtils.checkTokenPresent();
    }

    render(){
        let aiRenderDetails = {
            bigTitle: "1️⃣ Single Player",
            smallTitle: "🤖 Against the Bot.",
            description: "Play reversi against a computer player.",
            hrefEasy: "/board?mode=1",
            navMsgEasy: "🍂 EZ",
            hrefMed: "/board?mode=2",
            navMsgMed: "🌱 Okay",
            hrefHard: "/board?mode=3",
            navMsgHard: "🌲 !!!!",
        };

        let twoPlayerRenderDetails = {
            bigTitle: "2️⃣ Offline Multiplayer",
            smallTitle: "🎎 Against a friend.",
            description: "Play reversi against someone sitting next to you.",
            href: "/board?mode=0",
            navMsg: "Get Started!",
        };

        let ruleDetails = {
            bigTitle: "📖 Reversi Rules",
            smallTitle: "",
            description: "Read up on game rules.",
            href: "/rules",
            navMsg: "Read~",
        };

        let accountDetails = {
            bigTitle: "⚙️ Account Management",
            smallTitle: "",
            description: "Make changes to your account.",
            href: "/account",
            navMsg: "Edits~",
        };

        let aboutDetails = {
            bigTitle: "📇 Contact Us",
            smallTitle: "",
            description: "See any bugs? Contact us!",
            href: "/about",
            navMsg: "Contact~",
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

export default HomePage;
