import React, { Component } from 'react';
import AuthorCard from './AuthorCard';
import Nav from "./Nav"
import JwtUtils from '../utils/jwtUtils';

class AboutPage extends Component {
  constructor(props){
    super(props)
    JwtUtils.checkTokenPresent();
  }

    render(){
      let jeremy = {
        firstName: "Jeremy",
        lastName:"Q.",
        linkedInUrl: "https://www.linkedin.com/in/jeremy-qian/",
        gitUrl: "https://github.com/jeremyqzt",
        email: "mailto:jq357@hotmail.com",
        imgUrl: "https://avatars3.githubusercontent.com/u/6643065?s=400&v=4",
      };
      let ben = {
        firstName: "Ben",
        lastName:"N.",
        linkedInUrl: "https://www.linkedin.com/in/ben-ni-98761862/",
        gitUrl: "https://github.com/benbennza1",
        email: "mailto:nizhangan123@hotmail.com",
        imgUrl: "https://avatars3.githubusercontent.com/u/8797475?s=400&u=2503bce7af39559e19574963188ec2644ca92d85&v=4",
      };
      let yanqi = {
        firstName: "Yanqi",
        lastName:"L.",
        linkedInUrl: "https://www.linkedin.com/in/yanqilee/",
        gitUrl: "https://github.com/yanqilee",
        email: "mailto:yanqilee@hotmail.com",
        imgUrl: "https://avatars0.githubusercontent.com/u/8241930?s=400&u=fd10ebb904055e240145a9082f6bc3dd410af874&v=4",
      };
      let loob = {
        firstName: "Louis",
        lastName:"L.",
        linkedInUrl: "https://www.linkedin.com/in/louis-la-osh/",
        gitUrl: "",
        email: "lsg000@outlook.com",
        imgUrl: "https://media-exp1.licdn.com/dms/image/C5603AQGv16IfxKedeA/profile-displayphoto-shrink_800_800/0?e=1600300800&v=beta&t=cD8W1zLgptTEOT1lNZbqHkC3eIjjsDnHtQ65i5h7BQs",
      };
      return (
        <div>
            <Nav />
            <div className="container">
              <h3 className="mt-4 fade-in to-be-animated" style={{animationDelay: "0.25s"}}><span role="img" aria-label="aboot">🧭</span> About This Site</h3>
              <div className="row fade-in to-be-animated" style={{animationDelay: "0.25s"}}>
                <div className="col-12">
                  <p className="text-left">This website is made as a hobby project.
                  The code is completely available at our <a href="https://github.com/jeremyqzt/reversi" rel="noopener noreferrer" target="_blank" >Github</a>. 
                  The frontend is coded in ReactJS, backend is Django and there are 3 NodeJS based in-memory databases for storing the game states.
                  </p>
                  <p className="text-left"> AI Games and LAN games are completely implemented using frontend JavaScript. Multiplayer games submit moves to the server
                  and the servers check the moves by maintaining its own internal game - this implies that the server is playing the same game as the client and
                  the client always sends synchronization requests. We are unsure if this works 100% but are fairly confident, if there is a flaw, please fix it for 
                  us or tell us about it!
                  </p>
                  <p className="text-left">If there are other bugs, please also feel free to either fix it yourself or contact one of the authors.</p>
                </div>
              </div>
              <h3 className="mt-4 fade-in to-be-animated" style={{animationDelay: "0.5s"}}>
                  <span role="img" aria-label="factory">🏭</span> Bug Manufacturers
                </h3>
                <div className="row fade-in to-be-animated" style={{animationDelay: "0.5s"}}>
                    <AuthorCard renderDetails={jeremy} />
                    <AuthorCard renderDetails={ben} />
                </div>
                <div className="row fade-in to-be-animated" style={{animationDelay: "0.5s"}}>
                    <AuthorCard renderDetails={yanqi} />
                    <AuthorCard renderDetails={loob} />
                </div>
              <h3 className="mt-4 fade-in to-be-animated" style={{animationDelay: "1s"}}><span role="img" aria-label="zound">🔈</span> Sound Credits</h3>
              <div className="row fade-in to-be-animated" style={{animationDelay: "1s"}}>
                <div className="col-12">
                  <p className="text-left">Checker Board Sound <a href="https://freesound.org/people/mh2o/sounds/351518/" rel="noopener noreferrer" target="_blank" >(Link)</a> Under CC0 1.0 License <a href="https://creativecommons.org/publicdomain/zero/1.0/" rel="noopener noreferrer" target="_blank" >(Link)</a></p>
                  <p className="text-left">Error Sound <a href="https://freesound.org/s/142608/" rel="noopener noreferrer" target="_blank" >(Link)</a> Under CC BY 3.0 License <a href="https://creativecommons.org/licenses/by/3.0/" rel="noopener noreferrer" target="_blank" >(Link)</a></p>
                  <p className="text-left">Click Sound <a href="https://freesound.org/people/cabled_mess/sounds/370962/" rel="noopener noreferrer" target="_blank" >(Link)</a> Under CC0 1.0 License <a href="https://creativecommons.org/publicdomain/zero/1.0/" rel="noopener noreferrer" target="_blank" >(Link)</a></p>
                  <p className="text-left">Beep Sound <a href="https://freesound.org/people/janhgm/sounds/237990/" rel="noopener noreferrer" target="_blank" >(Link)</a> Under CC BY 3.0 License <a href="https://creativecommons.org/licenses/by/3.0/" rel="noopener noreferrer" target="_blank" >(Link)</a></p>
                </div>
              </div>
              <h3 className="mt-4 fade-in to-be-animated" style={{animationDelay: "1s"}}><span role="img" aria-label="cod">📇</span> Coding Credits</h3>
              <div className="row fade-in to-be-animated" style={{animationDelay: "1s"}}>
                <div className="col-12">
                  <p className="text-left">The Following Tutorial Was Used To Create the Authentication API On This Website <a href="https://hackernoon.com/110percent-complete-jwt-authentication-with-django-and-react-2020-iejq34ta" rel="noopener noreferrer" target="_blank" >(Link)</a></p>
                </div>
              </div>
            </div>
        </div>
      );
    };
  }

export default AboutPage;
