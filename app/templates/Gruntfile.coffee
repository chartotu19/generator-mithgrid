module.exports = (grunt)->
  #Project configuration
  grunt.initConfig
    pkg : grunt.file.readJSON "package.json"

    coffee:
      compile:
        files:
          "app/src/app.js" : "app/src/app.coffee"

    concat:
      options:
        stripBanners : true
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> */'
      dist:
        src:[
          'bower_components/jquery/jquery.js',
          'bower_components/mithgrid/dist/mithgrid.js',
          'app/src/app.js'
        ]
        dest: 'app/dist/complete.js'

  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-concat'
  

  grunt.registerTask 'build', ['coffee','concat']
