import React, { Component } from 'react';

class AuthorCard extends Component {
    render(){
      return (
          <div className="col-6">
            <div className="card mb-3">
              <div className="row no-gutters">
                <div className="col-md-4">
                  <img src={`${this.props.renderDetails.imgUrl}`} className="card-img" alt="..." />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">{this.props.renderDetails.firstName} {this.props.renderDetails.lastName}</h5>
                    <p className="card-text">Contact {this.props.renderDetails.firstName} via<i
                        className="fa fa-mail"></i> <a href={`${this.props.renderDetails.email}`}>E-mail</a> or <a
                        href={`${this.props.renderDetails.linkedInUrl}`} target="_blank" rel="noopener noreferrer">LinkedIn</a>.</p>
                    <div className="text-right">
                      {(this.props.renderDetails.gitUrl.length !== 0) && <a href={`${this.props.renderDetails.gitUrl}`} rel="noopener noreferrer" target="_blank" className="btn btn-outline-dark">Github</a>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
      );
    };
  }

export default AuthorCard