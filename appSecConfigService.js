"use strict";

var EdgeGrid = require("edgegrid");

class AppSecConfig {

  constructor() {
    this._edge = new EdgeGrid({
      path:"/Users/anedumar/.edgerc",
      section:"papi",
      debug:true
    });
  }
  add(a, b) {
    return a + b;
  }

  list() {

    return new Promise((resolve, reject)=>{
      let request = {
        method: "GET",
        path: "/papi/v1/properties?groupId=grp_18385&contractId=ctr_1-3CV382",
        followRedirect: false
      };
      this._edge.auth(request);
  
      this._edge.send(function (data, response) {
        if (response && response.statusCode >= 200 && response.statusCode < 400) {
          let parsed = JSON.parse(response.body);
          resolve(parsed);
        } else {
          reject(data);
        }
      });
    });
  }
}

module.exports = AppSecConfig;