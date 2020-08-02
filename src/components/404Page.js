import React, { Component } from 'react';
import Nav from "./Nav"
import serverComm from '../utils/serverComm.js';
import '../css/board.css';

class Page404 extends Component {
    constructor(props){
        super(props);
        this.checkJWTToken();   
    }

    checkJWTToken = () => {
        let postLocat = "auth/check/";
        serverComm.get(postLocat)
        .then((result) => {
          console.log(result.status)
          if (result.status === 200){
            this.goHome();
          } else {
            window.location.href = '/login';
          }
        });
    }

    async goHome(){
        await new Promise(r => setTimeout(r, 5000));
        //window.location.href = '/home';
    }

    render(){
      return (
        <div>
            <Nav />
            <div className="container fade-in to-be-animated" style={{animationDelay: "0.25s"}}>
                <div className="row mt-5">
                    <div className="col-12 mt-5">
                        <h1 className="display-1 text-center noSelect boldTheme text-dark"><span role="img" aria-label="stop">🛑</span></h1>
                    </div>
                    <div className="col-12">
                        <h1 className="display-1 text-center noSelect boldTheme text-dark">404 Not Found!</h1>
                    </div>
                    <div className="col-12">
                        <h4 className="display-5 text-center noSelect text-dark">Opps, we couldn't find that page!</h4>
                    </div>
                    <div className="col-12">
                        <h4 className="display-5 text-center noSelect text-dark">Redirecting you shortly...</h4>
                    </div>
                </div>
            </div>
        </div>
      );
    };
  }

export default Page404;