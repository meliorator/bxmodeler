module.exports = function (grunt) {

    'use strict';

    var globalConfig = {
        images: 'assets/images', /* папка для картинок сайта */
        styles: 'assets/css', /* папка для готовый файлов css стилей */
        fonts: 'fonts', /* папка для шрифтов */
        scripts: 'assets/js', /* папка для готовых скриптов js */
        src: 'dist', /* папка с исходными кодами js, less , etc. */
        lib: 'lib', /* папка с не скомпилеными js, less , etc. */
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
                src: ['lib/Control.js', 'lib/Point.js', 'lib/Shape.js', 'lib/Rectangle.js',
                    'lib/Circle.js', 'lib/Plane.js', 'lib/Board.js'],
                dest: 'dist/bxmodeler_core.js'
            }
            //classes: {
            //    src: ['lib/*.js'],
            //    dest:['dist/classes.js']
            //}
        },
        //uglify: {
        //    options: {
        //        banner: '<%= banner %>'
        //    },
        //    dist: {
        //        src: '<%= concat.dist.dest %>',
        //        dest: 'dist/<%= pkg.name %>.min.js'
        //    }
        //},
        //nodeunit: {
        //  files: ['test/**/*_test.js']
        //},
        //jshint: {
        //    options: {
        //        jshintrc: '.jshintrc'
        //    },
        //    gruntfile: {
        //        src: 'Gruntfile.js'
        //    },
        //    lib: {
        //        options: {
        //            jshintrc: 'lib/.jshintrc'
        //        },
        //        src: ['lib/**/*.js']
        //    },
        //    test: {
        //        src: ['test/**/*.js']
        //    }
        //},
        //watch: {
        //    gruntfile: {
        //        files: '<%= jshint.gruntfile.src %>',
        //        tasks: ['jshint:gruntfile']
        //    },
        //    lib: {
        //        files: '<%= jshint.lib.src %>',
        //        tasks: ['jshint:lib', 'nodeunit']
        //    },
        //    test: {
        //        files: '<%= jshint.test.src %>',
        //        tasks: ['jshint:test', 'nodeunit']
        //    }
        //},
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
                    src: '<%= globalConfig.src %>/bxmodeler_core.js',
                    dest: '<%= globalConfig.scripts %>/',
                    filter: 'isFile'
                },
                    {
                        expand: true,
                        flatten: true,
                        src: '<%= globalConfig.lib %>/css/bxmodeler.css',
                        dest: '<%= globalConfig.styles %>/',
                        filter: 'isFile'
                    },
                    {
                        expand: true,
                        flatten: true,
                        src: '<%= globalConfig.lib %>/images/grid.png',
                        dest: '<%= globalConfig.images %>/',
                        filter: 'isFile'
                    },
                //    {
                //    expand: true,
                //    flatten: true,
                //    src: '<%= globalConfig.bower_path %>/jquery/dist/jquery.min.js',
                //    dest: '<%= globalConfig.vendor_scripts %>/',
                //    filter: 'isFile'
                //}, {
                //    expand: true,
                //    flatten: true,
                //    src: '<%= globalConfig.bower_path %>/bootstrap/dist/js/bootstrap.min.js',
                //    dest: '<%= globalConfig.vendor_scripts %>/',
                //    filter: 'isFile'
                //}, {
                //    expand: true,
                //    flatten: true,
                //    src: '<%= globalConfig.bower_path %>/bootstrap/dist/css/bootstrap.min.css',
                //    dest: '<%= globalConfig.vendor_styles %>/',
                //    filter: 'isFile'
                //}, {
                //    expand: true,
                //    flatten: true,
                //    src: '<%= globalConfig.bower_path %>/svg.js/dist/svg.min.js',
                //    dest: '<%= globalConfig.vendor_scripts %>/',
                //    filter: 'isFile'
                //}
                ]
            }
        }
    });

    // These plugins provide necessary tasks.

    grunt.loadNpmTasks('grunt-contrib-concat');
    //grunt.loadNpmTasks('grunt-contrib-uglify');
    //grunt.loadNpmTasks('grunt-contrib-jshint');
    //grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    //grunt.loadNpmTasks('grunt-contrib-nodeunit');

    // Default task.
    //grunt.registerTask('default', ['jshint', 'nodeunit', 'concat', 'uglify'])
    grunt.registerTask('default', ['concat', 'copy']);

};
