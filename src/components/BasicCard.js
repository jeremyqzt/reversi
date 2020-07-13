import React, { Component } from 'react';

import '../css/board.css';

class BasicCard extends Component {
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
                            <div className="col-3"></div>
                            <div className="col-6">
                                <a className="btn btn-outline-dark w-100" href={`${this.props.renderDetails.href}`}>{this.props.renderDetails.navMsg}</a>
                            </div>
                            <div className="col-3"></div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        );
      };
}

export default BasicCard;