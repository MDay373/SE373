'use strict';

var uuid = require("uuid");

function Player() {}

Player.create = function (name, age) {
  var player = new Player()
  ;
  
  player.name = name;
  player.age = age;
  player.id = uuid.v4();
  
  return player;
};

var _p = Player.prototype;

_p.advanceAge = function () {
  this.age++;
};

_p.writeToConsole = function(cb){
    console.log(cb.name + " " +  cb.age + " " + cb.id);
}

module.exports = Player;