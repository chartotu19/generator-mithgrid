'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var MithgridGenerator = module.exports = function MithgridGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });
  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(MithgridGenerator, yeoman.generators.Base);

MithgridGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [{
    name: 'projName',
    message: 'What is the name of your MITHgrid application?',
    default: 'test'
  }];

  this.prompt(prompts, function (props) {
    this.projName = props.projName;
    cb();
  }.bind(this));
};

MithgridGenerator.prototype.app = function app() {
  this.mkdir('app');
  this.mkdir('app/src');
  this.mkdir('app/dist');
  this.mkdir('app/data');
  this.mkdir('app/styles');

  this.copy('app/data/first.json','app/data/first.json');
  this.copy('app/data/second.json','app/data/second.json');

  this.copy('app/styles/_main.css','app/styles/main.css');
  this.copy('app/styles/Roboto-Thin.ttf','app/styles/Roboto-Thin.ttf');

  this.template('app/src/_app.coffee','app/src/app.coffee');
  this.template('app/src/_presentation.coffee','app/src/presentation.coffee');
  this.template('app/src/_controller.coffee','app/src/controller.coffee');

  this.template('_index.html','index.html');
  this.template('_server.js','server.js');

  this.template('Gruntfile.coffee','Gruntfile.coffee');
  this.template('_package.json', 'package.json');
  this.template('_bower.json', 'bower.json');
  this.template('_readme.md', 'readme.md');
};

MithgridGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('bowerrc','.bowerrc');
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
};
