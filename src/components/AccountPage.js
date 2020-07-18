import React, { Component } from 'react';
import Nav from './Nav';
import AccountPrivacyCard from './AccountsPrivacyCard';
import JwtUtils from '../utils/jwtUtils';
import DeleteAccountCard from './DeleteAccountCard';
import ChangePassword from './ChangePasswordCard';

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
                <div className="container mt-1 mb-3">
                    <div className="row mt-4 fade-in to-be-animated" style={{animationDelay: "1.0s"}}>
                        <div className="col-12 mt-1">
                            <ChangePassword />
                        </div>
                    </div>
                    <div className="row mt-4 fade-in to-be-animated" style={{animationDelay: "0.75s"}}>
                        <div className="col-12 mt-1">
                            <DeleteAccountCard />
                        </div>
                    </div>
                    <div className="row mt-4 fade-in to-be-animated" style={{animationDelay: "0.5s"}}>
                        <div className="col-12 mt-1">
                            <AccountPrivacyCard />
                        </div>
                    </div>
                </div>
            </div>
        );
      };
}

export default AccountsPage;
