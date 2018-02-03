'use strict';
let untildify = require("untildify");
var EdgeGrid = require("edgeGrid");
const winston = require("winston");

var logger = new winston.Logger({
  level: process.env.LOG_LEVEL ? process.env.LOG_LEVEL : "error",
  transports: [
    new winston.transports.Console()
  ]
});

class Edge {
    constructor(auth = {
        path: "~/.edgerc",
        section: "papi",
        debug: false,
        default: true
      }) {
        if (auth.clientToken && auth.clientSecret && auth.accessToken && auth.host) {
          this._edge = new EdgeGrid(auth.clientToken, auth.clientSecret, auth.accessToken, auth.host, auth.debug);
        } else {
          this._edge = new EdgeGrid({
            path: untildify(auth.path),
            section: auth.section,
            debug: auth.debug
          });
        }
      }

      get(request) {
        return new Promise((resolve,reject)=>{
          this._edge.auth(request);
          this._edge.send(function (data, response) {
            logger.debug("Response from server: "+JSON.stringify(response));
            if (response && response.statusCode >= 200 && response.statusCode < 400) {
              resolve(JSON.parse(response.body));
            } else { 
              reject("Could not get configurations at this time.");
            }
          });
        });
      }
}

module.exports = Edge;