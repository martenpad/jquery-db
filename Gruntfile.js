/*jshint node: true */

'use strict';

module.exports = function (grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                sourceMap: 'build/<%= pkg.name %>.<%= pkg.version %>.map',
                mangle: {
                    except: ['jQuery']
                }
            },
            build: {
                src: 'src/<%= pkg.name %>.js',
                dest: 'build/<%= pkg.name %>.<%= pkg.version %>.min.js'
            }
        },
        clean: [
            'build',
            'dist'
        ],
        copy: {
            main: {
                flatten: true,
                expand: true,
                cwd: 'build/',
                src: [
                    '<%= pkg.name %>.<%= pkg.version %>.min.js',
                    '<%= pkg.name %>.<%= pkg.version %>.map'
                ],
                dest: 'dist/'
            }
        },
        jshint: {
            files: [
                'Gruntfile.js',
                'src/jquery.db.js'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },
        qunit: {
            all: ['test/index.html']
        }
    });

    // Loading dependencies
    for (var key in grunt.file.readJSON('package.json').devDependencies) {
        if (key !== 'grunt' && key.indexOf('grunt') === 0) {
            grunt.loadNpmTasks(key);
        }
    }

    // Default task(s).
    grunt.registerTask('default', ['jshint', 'qunit', 'clean', 'uglify']);

    grunt.registerTask('test', ['jshint', 'qunit']);

    grunt.registerTask('dist', ['jshint', 'qunit', 'clean', 'uglify', 'copy']);
};
