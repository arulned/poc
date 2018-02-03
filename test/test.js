/* global describe it before*/
var chai = require('chai');
var expect = chai.expect;

var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var AppSecConfig = require("../appSecConfig");
var nock = require("nock");

describe("AppSecConfig get configurations", function () {
  var appSecConfig = new AppSecConfig();
  /* Mock the HTTPS call */
  before(function () {
    nock(/.*.akamaiapis.net/)
                .get('/v1/configs')
                .reply(200, [{ configId: 1234 },{ configId: 5678 }]);
  });

  it("success resp should return all configuration", function () {
    let resultPromise = appSecConfig.configs();
    return expect(resultPromise).to.eventually.deep.equal([1234,5678]);
  });
});

describe("AppSecConfig get configurations", function () {
  var appSecConfig = new AppSecConfig();
  /* Mock the HTTPS call */
  before(function () {
    nock(/.*.akamaiapis.net/)
                .get('/v1/configs')
                .replyWithError({detail:"Some Error"});
  });

  it("serror resp hould show error message", function () {
    let resultPromise = appSecConfig.configs();
    resultPromise.catch(err=>{
      expect(err).to.equal("Could not get configurations at this time.");
    });
  });
});