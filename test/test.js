/* global describe it before*/
//var expect = require("chai").expect;
//var sinon = require("sinon");
var AppSecConfig = require("../appSecConfig");
var nock = require("nock");

describe("AppSecConfig.configs()", function () {
  var twitstat = new AppSecConfig();
  var scope;
  before(function () {
    scope = nock(/.*.akamaiapis.net/)
                .get('/v1/configs')
                .reply(200, { hello: 'worldeeee' });
  });

  it(" should return all configuration", function () {

    //var expectedEndpoint = "/v1/configs";
    // var body = JSON.stringify({
    //   count: 9,
    //   url: "http://some-url.com/"
    // });
    
    //edgegrid.onFirstCall().returns(body);
    twitstat.configs(function(resp){
      console.log('==='+JSON.stringify(resp));
    });

    console.log(scope.isDone());
    //expect(result).to.equal(11);
  });
});