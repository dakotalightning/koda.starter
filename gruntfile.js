
/*
This file in the main entry point for defining grunt tasks and using grunt plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkID=513275&clcid=0x409
*/

var sassOptions = {
  expand: true,
  cwd: 'src/scss',
  src: ["**/*.scss"],
  dest: "dist/css"
};

module.exports = function(grunt) {
  require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    connect: {
      server: {
        options: {
          port: 9000,
          hostname: 'localhost',
          livereload: 35729,
          open: true,
          base: {
            path: 'src',
            options: {
              index: 'index.html'
            }
          },
          keepalive: false
        }
      }
    },
    wiredep: {
      dev: {
        src: [
          'src/*.html',
          'src/scss/styles.scss'
        ],
        options: {

        }
      }
    },
    sass: {
      dev: {
        options: {
          style: 'compact'
        },
        files: [{
          expand: sassOptions.expand,
          cwd: sassOptions.cwd,
          src: sassOptions.src,
          dest: "src/css",
          ext: ".css"
        }]
      },
      dist: {
        options: {
          style: 'compressed'
        },
        files: [{
          expand: sassOptions.expand,
          cwd: sassOptions.cwd,
          src: sassOptions.src,
          dest: sassOptions.dest,
          ext: ".min.css"
        }]
      }
    },
    concat: {
      options: {
        separator: ';',
        stripBanners: true,
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %> */',
      },
      dist: {
        src: [
          'src/js/app.js'
        ],
        dest: 'dist/js/app.js',
      }
    },
    uglify: {
      options: {
        mangle: false,
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %> */',
      },
      dist: {
        files: {
          'dist/js/app.min.js': ['dist/js/app.js']
        }
      }
    },
    watch: {
      sass: {
        files: 'src/scss/**/*.scss',
        tasks: ["sass:dev"],
        options: {
          livereload: true
        }
      }
    }
  });
  grunt.registerTask('start', 'Compile then start a connect web server', function(target) {
    grunt.task.run([
      'wiredep',
      'sass',
      'connect',
      'watch'
    ]);
  });
};
