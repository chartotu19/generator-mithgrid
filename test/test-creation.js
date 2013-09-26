/*global describe, beforeEach, it*/
'use strict';

var path    = require('path');
var helpers = require('yeoman-generator').test;


describe('mithgrid generator', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }

      this.app = helpers.createGenerator('mithgrid:app', [
        '../../app'
      ]);
      done();
    }.bind(this));
  });

  it('creates expected files', function (done) {
    var expected = [
      'app/data/first.json',
      'app/data/second.json',
      'app/src/app.coffee',
      'app/src/presentation.coffee',
      'app/src/controller.coffee',
      'app/styles/main.css',
      'app/styles/Roboto-Thin.ttf',
      'index.html',
      'Gruntfile.coffee',
      'server.js',
      'bower.json',
      '.jshintrc',
      '.editorconfig',
      '.bowerrc'
    ];

    helpers.mockPrompt(this.app, {
      'projName': 'test'
    });
    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      helpers.assertFiles(expected);
      done();
    });
  });
});
