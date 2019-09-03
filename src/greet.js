'use strict';

var greet = function(name) {
  if (name === undefined) {
    name = 'World';
  }
  return 'Hello ' + name + '!';
};

module.exports = greet;