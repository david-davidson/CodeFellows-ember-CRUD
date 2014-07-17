module.exports = function(grunt) {
    'use strict';
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        express: {
            all: {
                options: {
                    port: 9000,
                    hostname: 'localhost',
                    livereload: true,
                    bases: './'
                }
            }
        },
        open: {
            all: {
                path: 'http://localhost:<%= express.all.options.port%>'
            }
        },
        watch: {
            all: {
                files: [
                    'app.js',
                    'index.html',
                    'styles.scss'
                ],
                tasks: [
                    'sass',
                    'jshint'
                ],
                options: {
                    livereload: true
                }
            }
        },
        sass: {
            build: {
                files: {
                    'styles.css': 'styles.scss'
                }
            }
        },
        jshint: {
            files: ['app.js']
        }
    });
grunt.registerTask('default', [
    'sass',
    'jshint',
    'express',
    'open', 
    'watch'
    ]);
};