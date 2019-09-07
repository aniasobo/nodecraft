'use strict';

var FilesizeWatcher = require('../src/FilesizeWatcher');
var exec = require('child_process').exec;

describe("FilesizeWatcher", function() {
  var watcher;

  afterEach(function() {
    watcher.stop();
  });

  it('should fire a grow event when file grows in size', function(done) {
    var path = '/var/tmp/filesizewatcher.test';
    exec('rm -f ' + path + ' ; touch ' + path, function(){
      watcher = new FilesizeWatcher(path);

      watcher.on('grew', function(gain) {
        expect(gain).toBe(5);
        done(); // callback function passed to the it block by Jasmine - used for asynchronous operations
      });

      exec('echo "test" > ' + path, function() {} );
    });
  });

  it('should fire a shrink event when file loses size', function(done) {
    var path = '/var/tmp/filesizewatcher.test';
    exec('rm -f ' + path + ' ; echo "test" > ' + path, function(){
      watcher = new FilesizeWatcher(path);

      watcher.on('shrank', function(loss){
        expect(loss).toBe(3);
        done();
      });

    exec('echo "a" > ' + path, function(){});
    });
  });

  it('should fire "error" if file does not start with a slash', function(done) {
    var path = '/var/tmp/filesizewatcher.test';
    watcher = new FilesizeWatcher(path);

    watcher.on("error", function(err){
      expect(err).toBe('Path does not start with a slash.');
      done();
    });
  });

});