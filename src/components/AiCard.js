import React, { Component } from 'react';

import '../css/board.css';

class AiCard extends Component {
    render(){
        return (
            <div className="card text-center h-100">
            <h5 className="card-header bg-dark text-light noSelect">{this.props.renderDetails.bigTitle}</h5>
            <div className="row">
                <div className="col-12">
                    <div className="card-body">
                        <h5 className="card-title">{this.props.renderDetails.smallTitle}</h5>
                        <p className="card-text">{this.props.renderDetails.description}</p>
                        <div className="row">
                            <div className="col-4">
                                <a className="btn btn-outline-info w-100" href={`${this.props.renderDetails.hrefEasy}`}>{this.props.renderDetails.navMsgEasy}</a>
                            </div>
                            <div className="col-4">
                                <a className="btn btn-outline-warning w-100" href={`${this.props.renderDetails.hrefMed}`}>{this.props.renderDetails.navMsgMed}</a>
                            </div>
                            <div className="col-4">
                                <a className="btn btn-outline-danger w-100" href={`${this.props.renderDetails.hrefHard}`}>{this.props.renderDetails.navMsgHard}</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        );
      };
}

export default AiCard;