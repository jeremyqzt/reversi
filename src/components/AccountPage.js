import React, { Component } from 'react';
import Nav from './Nav';
import AccountPrivacyCard from './AccountsPrivacyCard';
import JwtUtils from '../utils/jwtUtils';
import DeleteAccountCard from './DeleteAccountCard';
import '../css/board.css';
import '../css/home.css';

class AccountsPage extends Component {
    constructor(props){
        super(props)
        JwtUtils.checkTokenPresent();
    }

    render(){
        return (
            <div>           
                <Nav />
                <div className="container mt-1">
                    <div className="row mt-4 fade-in to-be-animated" style={{animationDelay: "0.5s"}}>
                        <div className="col-12 mt-5">
                            <AccountPrivacyCard />
                        </div>
                    </div>
                    <div className="row mt-4 fade-in to-be-animated" style={{animationDelay: "1s"}}>
                        <div className="col-12 mt-5">
                            <DeleteAccountCard />
                        </div>
                    </div>
                    <div className="row mt-4 fade-in to-be-animated" style={{animationDelay: "1.5s"}}>
                        <div className="col-12 mt-5">
                            <AccountPrivacyCard />
                        </div>
                    </div>
                </div>
            </div>
        );
      };
}

export default AccountsPage;
