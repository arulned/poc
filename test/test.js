var ApiService = require("../service");
var expect = require('chai').expect;

var apiService = new ApiService();

describe("ApiService.add()", function(){
  it("should add two numbers",function(){
    let result = apiService.add(5,6);
    expect(result).to.equal(11);
  });
});
