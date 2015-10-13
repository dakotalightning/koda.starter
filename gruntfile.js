/*
This file in the main entry point for defining grunt tasks and using grunt plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkID=513275&clcid=0x409
*/

var sassOptions = {
    expand: true,
    cwd: 'scss',
    src: ["**/*.scss"],
    dest: "css"
}

module.exports = function (grunt) {
    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        sass: {
            compact: {
                options: {
                    style: 'compact'
                },
                files: [
                  {
                      expand: sassOptions.expand,
                      cwd: sassOptions.cwd,
                      src: sassOptions.src,
                      dest: sassOptions.dest,
                      ext: ".css"
                  }
                ]
            },
            dist: {
                options: {
                    style: 'compressed'
                },
                files: [
                  {
                      expand: sassOptions.expand,
                      cwd: sassOptions.cwd,
                      src: sassOptions.src,
                      dest: sassOptions.dest,
                      ext: ".min.css"
                  }
                ]
            }
        },
        watch: {
            sass: {
                files: 'scss/**/*.scss',
                tasks: ["sass"],
                options: {
                    livereload: true
                }
            }
        }
    });

    grunt.registerTask('default', []);
};
