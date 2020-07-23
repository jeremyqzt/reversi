import JwtUtils from './jwtUtils.js';
import serverCfg from './serverCfg.js';

class serverComm{
    static async post(data = {}, url) {
        const response = fetch(`${serverCfg.server}${url}`, {
          method: 'POST',
          mode: serverCfg.cors,
          cache: 'no-cache',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `JWT ${JwtUtils.getAccessToken()}`,
          },
          redirect: 'follow',
          referrerPolicy: 'no-referrer',
          body: JSON.stringify(data),
        });
        return response;
      }


      static async get(url) {
        // Default options are marked with *
        const response = fetch(`${serverCfg.server}${url}`, {
          method: 'GET', // *GET, POST, PUT, DELETE, etc.
          mode: serverCfg.cors, // no-cors, *cors, same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'same-origin', // include, *same-origin, omit
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `JWT ${JwtUtils.getAccessToken()}`,
          },
          redirect: 'follow', // manual, *follow, error
          referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        });
        return response;
      }

      static async delete(data, url) {
        // Default options are marked with *
        const response = fetch(`${serverCfg.server}${url}`, {
          method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
          mode: serverCfg.cors, // no-cors, *cors, same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'same-origin', // include, *same-origin, omit
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `JWT ${JwtUtils.getAccessToken()}`,
          },
          redirect: 'follow', // manual, *follow, error
          referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
          body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
        return response;
      }

      static async put(data, url) {
        // Default options are marked with *
        const response = fetch(`${serverCfg.server}${url}`, {
          method: 'PUT', // *GET, POST, PUT, DELETE, etc.
          mode: serverCfg.cors, // no-cors, *cors, same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'same-origin', // include, *same-origin, omit
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `JWT ${JwtUtils.getAccessToken()}`,
          },
          redirect: 'follow', // manual, *follow, error
          referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
          body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
        return response;
      }
}

export default serverComm;