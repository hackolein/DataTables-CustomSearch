/**
 * # Grunt
 * A task manager for auto compiling and validating code
 *
 * ## Set up
 * Make sure the you have nodejs running on your machine
 * Install Grunt with npm `npm install -g grunt-cli`
 * Install Grunt packages `npm install`
 *
 * ## Config
 * The configuration settings are found in `package.json`.
 *
 * ## Running
 * You can type `grunt <command>` to run any of rules in the `initConfig` function
 * e.g. `grunt compass` to compile the scss files to css
 *
 * You can also run a sub-task by adding `:<subtask>`
 * e.g. `grunt uglify:js` to compile to javaScript header file
 *
 * ## Helper Commands
 * There are a number of helper command at the end of the file
 * - default (`grunt`) will watch the folder and compile when files are saved
 */

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function(grunt) {
  'use strict';

  // require it at the top and pass in the grunt instance
  require('time-grunt')(grunt);

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    meta: {
      banner: '<%= pkg.name %> by <%= pkg.author %> (<%= grunt.template.today("yyyy-mm-dd, HH:MM") %>)',
      bannerJS:
      '/*\n' +
      ' * <%= meta.banner %>\n' +
      ' */'
    },

    uglify: {
      js: {
        options: {
          banner: '<%= meta.bannerJS %>\n',
          sourceMap: true,
          mangle: false
        },
        files: {
          'jquery.datatables.customsearch.min.js': ['jquery.datatables.customsearch.js']
        }
      }
    },

    watch: {

      options: {
        spawn:      false,
        livereload: true
      },

      js: {
        files: ['*.js'],
        tasks: [
          'uglify:js'
        ]
      },

    }

  });

  // load all plugins from the "package.json"-file
  require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

  grunt.registerTask('default', ['watch']);

  grunt.registerTask(
    'build',
    'Build this ... yeaahhh!',
    [ 'uglify:js']
  );

};
