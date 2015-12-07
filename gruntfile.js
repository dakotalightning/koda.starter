/*
This file in the main entry point for defining grunt tasks and using grunt plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkID=513275&clcid=0x409
*/

var sassOptions = {
    expand: true,
    cwd: 'scss',
    src: ["**/*.scss"],
    dest: "public/css"
}

module.exports = function (grunt) {
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
                    base: 'public',
                    keepalive: false
                }
            }
        },
        sass: {
            dev: {
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
                tasks: ["sass:dev"],
                options: {
                    livereload: true
                }
            }
        }
    });
    grunt.registerTask('start', 'Compile then start a connect web server', function (target) {
        grunt.task.run([
            'sass:dev',
            'connect',
            'watch'
        ]);
    });

    grunt.registerTask('default', ['sass:dist']);
};
