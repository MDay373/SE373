'use strict';

var Player = require("../Typings/Player")
, chai = require("chai")
, sinon = require("sinon")
, DataLoader = require("../Typings/DataLoader")
, should = chai.should()
, expect = chai.expect
, dataAccess = new DataLoader();



describe('Chai Test', function(){

    describe("Player", function(){

        //Arrange
        var playerName = "Kyrie Irving",
            playerAge = 26

        it('should create a new player including a new ID', function(){
            //Act
            var player = Player.create(playerName, playerAge);
            //Assert
            should.exist(player.name);
            player.name.should.equal(playerName);

            should.exist(player.age);
            player.age.should.equal(playerAge);

            should.exist(player.id);
        });

        it('should increase the players age by 1 year', function(){
            //Act
            var player = Player.create(playerName, playerAge);
            player.advanceAge();
            //Assert
            should.exist(player.age);
            player.age.should.equal(playerAge + 1);
        });
    });

});

describe('Sinon spy Test', function(){
    describe("Player.create", function(){        
        //Arrange
        var playerName = "Kyrie Irving",
            playerAge = 26

        it('should call a method using a Spy', function(){
            //Act
            sinon.spy(Player, 'create');
            var player = Player.create(playerName, playerAge);
            player.writeToConsole(player);
            //Assert
            Player.create.called.should.be.true;
        })
        after(function () {
            Player.create.restore(); // Unwraps the spy
        });

    });
});

describe('Sinon Stub Test', function(){
    describe("Player.create", function(){        
        //Arrange
        var playerName = "Kyrie Irving",
            playerAge = 26

        it('should call a method using a Stub', function(){
            //Act

            var stub = sinon.stub(Player)
            stub.create(playerName, playerAge);
            //stub.create.returns(null);
            
            //Assert
            stub.create.called.should.be.true;
        })            
    });  
    after(function () {
        Player.create.restore(); // Unwraps the Stub
    });  
});

describe('Sinon Mock Test', function(){
    describe("Player.create", function(){        
        //Arrange
        var playerName = "Kyrie Irving",
            playerAge = 26

        it('should call a method using a Mock', function(){
            var mockObj = sinon.mock(Player);
            var expectation = mockObj.expects('create').once();

            Player.create(playerName, playerAge);
            expectation.verify();
        })            
    });    
});

describe('Sinon Data Acess Test', function(){
    it('should get a player synchronously', function(){
        var plr = dataAccess.getPlayerSync(1);

        should.exist(plr.name);
        
    });
        
    it('gets a Player asynchronously', function(done) {
        dataAccess.getPlayer(1, function(plr) {
          should.exist(plr.name);
          plr.name.should.equal("Kyrie Irving");
          done();
        });
      });
});
