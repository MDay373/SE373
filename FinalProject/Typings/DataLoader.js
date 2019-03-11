'use strict';

var fs = require("fs")
, _p;
function DataLoader () {}
_p = DataLoader.prototype;

_p.getPlayerSync = function(id) {
    var filepath = "./Data/" +  id + ".json";

    return JSON.parse(fs.readFileSync(filepath));
};
_p.getPlayer = function (id, cb) {
  var filePath = "./Data/"+id+".json";

  fs.readFile(filePath, function (err, data) {
      if (err) {
        if (err.code && "ENOENT" === err.code) {
          throw new Error("Player "+id+" does not exist");
        }
        throw err;
      }
      
      cb(JSON.parse(data));
    });
  };

module.exports = DataLoader;
