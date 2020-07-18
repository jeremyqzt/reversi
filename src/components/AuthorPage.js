import React, { Component } from 'react';
import AuthorCard from './AuthorCard';
import Nav from "./Nav"

class AuthorPage extends Component {
    render(){
      let jeremy = {
        firstName: "Jeremy",
        lastName:"Q.",
        linkedInUrl: "https://www.linkedin.com/in/jeremy-qian/",
        gitUrl: "https://github.com/jeremyqzt",
        email: "mailto:jq357@hotmail.com",
        imgUrl: "https://avatars3.githubusercontent.com/u/6643065?s=400&v=4",
      }
      let ben = {
        firstName: "Ben",
        lastName:"N.",
        linkedInUrl: "https://www.linkedin.com/in/ben-ni-98761862/",
        gitUrl: "https://github.com/benbennza1",
        email: "mailto:nizhangan123@hotmail.com",
        imgUrl: "https://avatars3.githubusercontent.com/u/8797475?s=400&u=2503bce7af39559e19574963188ec2644ca92d85&v=4",
      }
      return (
        <div>
            <Nav />
            <div className="container">
                <h2>Authors</h2>
                <div className="row">
                    <AuthorCard renderDetails={jeremy} />
                    <AuthorCard renderDetails={ben} />
                </div>
            </div>
        </div>
      );
    };
  }

export default AuthorPage;
