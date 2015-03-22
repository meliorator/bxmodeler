'use strict';

module.exports = function (grunt) {

    var globalConfig = {
        images: 'images', /* папка для картинок сайта */
        styles: 'assets/css', /* папка для готовый файлов css стилей */
        fonts: 'fonts', /* папка для шрифтов */
        scripts: 'assets/js', /* папка для готовых скриптов js */
        src: 'lib', /* папка с исходными кодами js, less , etc. */
        bower_path: 'bower_components', /* папка где хранятся библиотеки jquery, bootstrap, SyntaxHighlighter, etc. */
        vendor_styles: 'assets/vendors/css',
        vendor_scripts: 'assets/vendors/js',
        vendor_images: 'assets/vendors/images',
        vendor_fonts: 'assets/vendors/fonts'
    };

    // Project configuration.
    grunt.initConfig({
        globalConfig: globalConfig,
        // Metadata.
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
        ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
        // Task configuration.
        concat: {
            options: {
                banner: '<%= banner %>',
                stripBanners: true
            },
            dist: {
                src: ['lib/<%= pkg.name %>.js'],
                dest: 'dist/<%= pkg.name %>.js'
            }
        },
        uglify: {
          options: {
            banner: '<%= banner %>'
          },
          dist: {
            src: '<%= concat.dist.dest %>',
            dest: 'dist/<%= pkg.name %>.min.js'
          }
        },
        nodeunit: {
          files: ['test/**/*_test.js']
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            gruntfile: {
                src: 'Gruntfile.js'
            },
            lib: {
                options: {
                    jshintrc: 'lib/.jshintrc'
                },
                src: ['lib/**/*.js']
            },
            test: {
                src: ['test/**/*.js']
            }
        },
        watch: {
            gruntfile: {
                files: '<%= jshint.gruntfile.src %>',
                tasks: ['jshint:gruntfile']
            },
            lib: {
                files: '<%= jshint.lib.src %>',
                tasks: ['jshint:lib', 'nodeunit']
            },
            test: {
                files: '<%= jshint.test.src %>',
                tasks: ['jshint:test', 'nodeunit']
            }
        },
        /**
         * Задача "copy"
         *
         * выбрать из библиотек lobalConfig.bower_path = 'bower_components'
         * нужные для проекта файлы и скопировать их в соответствующие папки
         */
        copy: {
            main: {
                files: [{
                        expand: true,
                        flatten: true,
                        src: '<%= globalConfig.src %>/*.js',
                        dest: '<%= globalConfig.scripts %>/',
                        filter: 'isFile'
                    }, {
                        expand: true,
                        flatten: true,
                        src: '<%= globalConfig.bower_path %>/jquery/dist/jquery.min.js',
                        dest: '<%= globalConfig.vendor_scripts %>/',
                        filter: 'isFile'
                    }, {
                        expand: true,
                        flatten: true,
                        src: '<%= globalConfig.bower_path %>/bootstrap/dist/js/bootstrap.min.js',
                        dest: '<%= globalConfig.vendor_scripts %>/',
                        filter: 'isFile'
                    }, {
                        expand: true,
                        flatten: true,
                        src: '<%= globalConfig.bower_path %>/bootstrap/dist/css/bootstrap.min.css',
                        dest: '<%= globalConfig.vendor_styles %>/',
                        filter: 'isFile'
                    }, {
                        expand: true,
                        flatten: true,
                        src: '<%= globalConfig.bower_path %>/svg.js/dist/svg.min.js',
                        dest: '<%= globalConfig.vendor_scripts %>/',
                        filter: 'isFile'
                    }]
            }
        }
    });

    // These plugins provide necessary tasks.

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');

    // Default task.
    //grunt.registerTask('default', ['jshint', 'nodeunit', 'concat', 'uglify'])
    grunt.registerTask('default', ['jshint', 'nodeunit', 'concat', 'uglify', 'copy']);

};
