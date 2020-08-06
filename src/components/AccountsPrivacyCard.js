import React, { Component } from 'react';

import '../css/board.css';

class AccountPrivacyCard extends Component {
    render(){
        return (
            <div className="card text-center h-100">
            <h5 className="card-header bg-dark text-light noSelect"><span role="img" aria-label="priv">🕵️‍</span> Privacy Statement <span role="img" aria-label="priv">🕵️‍♀️</span> </h5>
                <div className="card-body">
                    <h5 className="card-title">We promise to never</h5>
                    <p className="card-text">
                        Share your E-mail with anyone else<br />
                        Send you any E-mail - your E-mail is only ever used as a username<br />
                        Track you in any way - the only cookie is used for your authentication<br />
                    </p>
                    <h5 className="card-title">You can choose to</h5>
                    <p className="card-text">
                        Permanently delete your account from our servers - it will be removed
                    </p>
                </div>
            </div>
        );
      };
}

export default AccountPrivacyCard;
