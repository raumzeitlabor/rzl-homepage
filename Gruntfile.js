// Generated on 2014-08-03 using generator-webapp 0.4.8
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    grunt.loadNpmTasks('grunt-jekyll');
    grunt.loadNpmTasks('grunt-connect-proxy');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-git-describe');
    grunt.loadNpmTasks('grunt-text-replace');

    // Define the configuration for all the tasks
    grunt.initConfig({

        // Project settings
        config: {
            // Configurable paths
            app: 'app',
            dist: 'dist',
            jekyll: '.layouts'
        },

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            //bower: {
            //    files: ['bower.json'],
            //    tasks: ['bowerInstall']
            //},
            js: {
                files: ['<%= config.app %>/scripts/{,*/}*.js'],
                tasks: ['jshint', 'copy:js'],
                options: {
                    livereload: true
                }
            },
            jstest: {
                files: ['test/spec/{,*/}*.js'],
                tasks: ['test:watch']
            },
            gruntfile: {
                files: ['Gruntfile.js']
            },
            styles: {
                files: ['<%= config.app %>/styles/{,*/}*.css'],
                tasks: ['newer:copy:styles', 'autoprefixer']
            },
            jekyll: {
                files: [
                    '<%= config.app %>/**/*.html',
                    '<%= config.app %>/**/*.md',
                    '<%= config.app %>/feed.xml',
                    '<%= config.app %>/sitemap.xml',
                    '_config.yml'
                ],
                tasks: [
                    'clean:dist',
                    'jshint',
                    'copy:jekyll',
                    'autoprefixer',
                    'jekyll:dist',
                    'copy:build',
                    'saveRevision'
                ],
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= config.app %>/{,*/}*.html',
                    '<%= config.app %>/{,*/}*.md',
                    '.tmp/styles/{,*/}*.css',
                    '<%= config.app %>/images/{,*/}*'
                ]
            }
        },

        // The actual grunt server settings
        connect: {
            options: {
                port: 8000,
                livereload: 35729,
                // Change this to '0.0.0.0' to access the server from outside
                hostname: '0.0.0.0'
            },
            proxies: [
                {
                    context: '/events/ical',
                    host: 'p.fruux.com',
                    port: 443,
                    https: true,
                    xforward: false,
                    changeOrigin: true,
                    rewrite: {
                        '^/events/ical': '/c/a3298259302/81bae0fb-601c-47ee-ba92-460866466d90.ics'
                    }
                }
            ],
            livereload: {
                options: {
                    open: false,
                    base: [
                        '.tmp',
                        '<%= config.dist %>',
                        '<%= config.app %>'
                    ],
                    middleware: function (connect, options) {
                        if (!Array.isArray(options.base)) {
                            options.base = [options.base];
                        }

                        // Setup the proxy
                        var middlewares = [require('grunt-connect-proxy/lib/utils').proxyRequest];

                        // Serve static files.
                        var serveStatic = require('serve-static');

                        options.base.forEach(function(base) {
                            middlewares.push(serveStatic(base));
                        });

                        // Make directory browse-able.
                        var directory = options.directory || options.base[options.base.length - 1];
                        middlewares.push(serveStatic(directory));

                        return middlewares;
                    }
                }
            },
            test: {
                options: {
                    port: 9001,
                    base: [
                        '.tmp',
                        'test',
                        '<%= config.app %>'
                    ]
                }
            },
            dist: {
                options: {
                    open: false,
                    base: '<%= config.dist %>',
                    livereload: false
                }
            }
        },

        // Empties folders to start fresh
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= config.jekyll %>',
                        '<%= config.dist %>/*',
                        '!<%= config.dist %>/.git*'
                    ]
                }]
            },
            server: '.tmp'
        },

        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                'Gruntfile.js',
                '<%= config.app %>/scripts/{,*/}*.js',
                '!<%= config.app %>/scripts/vendor/*',
                'test/spec/{,*/}*.js'
            ]
        },

        // Mocha testing framework configuration options
        mocha: {
            all: {
                options: {
                    run: false,
                    urls: ['http://<%= connect.test.options.hostname %>:<%= connect.test.options.port %>/index.html']
                }
            }
        },

        // Add vendor prefixed styles
        autoprefixer: {
            options: {
                browsers: ['last 1 version']
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/styles/',
                    src: '{,*/}*.css',
                    dest: '.tmp/styles/'
                }]
            }
        },

        // Automatically inject Bower components into the HTML file
        //bowerInstall: {
        //    app: {
        //        src: ['<%= config.app %>/index.html'],
        //        ignorePath: '<%= config.app %>/'
        //    }
        //},

        // Renames files for browser caching purposes
        rev: {
            dist: {
                files: {
                    src: [
                        '<%= config.dist %>/images/{,*/}*.*',
                        '<%= config.dist %>/*.{ico,png}',
                        '<%= config.dist %>/scripts/{,*/}*.js',
                        '<%= config.dist %>/styles/{,*/}*.css',
                        '<%= config.dist %>/fonts/{,*/}*.*',
                        '<%= config.dist %>/bower_components/leaflet/dist/leaflet.*',
                    ]
                }
            }
        },

        // Reads HTML for usemin blocks to enable smart builds that automatically
        // concat, minify and revision files. Creates configurations in memory so
        // additional tasks can operate on them
        useminPrepare: {
            options: {
                dest: '<%= config.dist %>'
            },
            html: [
                '<%= config.app %>/**/*.html',
                '!<%= config.app %>/_posts/*'
            ]
        },

        // Performs rewrites based on rev and the useminPrepare configuration
        usemin: {
            options: {
                assetsDirs: ['<%= config.dist %>', '<%= config.dist %>/fonts'],
            },
            html: [
                '<%= config.jekyll %>/**/*.html',
                '!<%= config.jekyll %>/_posts/*'
            ],
            css: ['<%= config.dist %>/styles/**/*.css']
        },

        // The following *-min tasks produce minified files in the dist folder
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>/images',
                    src: '{,*/}*.{gif,jpeg,jpg,png}',
                    dest: '<%= config.dist %>/images'
                }]
            }
        },

        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>/images',
                    src: '{,*/}*.svg',
                    dest: '<%= config.dist %>/images'
                }]
            }
        },

        htmlmin: {
            dist: {
                options: {
                    collapseBooleanAttributes: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true,
                    removeCommentsFromCDATA: true,
                    removeEmptyAttributes: true,
                    removeOptionalTags: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>',
                    src: '**/*.html',
                    dest: '<%= config.dist %>'
                }]
            }
        },

        // By default, your `index.html`'s <!-- Usemin block --> will take care of
        // minification. These next options are pre-configured if you do not wish
        // to use the Usemin blocks.
        // cssmin: {
        //     dist: {
        //         files: {
        //             '<%= config.dist %>/styles/main.css': [
        //                 '.tmp/styles/{,*/}*.css',
        //                 '<%= config.app %>/styles/{,*/}*.css'
        //             ]
        //         }
        //     }
        // },
        // uglify: {
        //     dist: {
        //         files: {
        //             '<%= config.dist %>/scripts/scripts.js': [
        //                 '<%= config.dist %>/scripts/scripts.js'
        //             ]
        //         }
        //     }
        // },
        // concat: {
        //     dist: {}
        // },

        // Copies remaining files to places other tasks can use
        copy: {
            jekyll: {
                files: [{
                    expand: true,
                    dot: false,
                    cwd: '<%= config.app %>',
                    dest: '<%= config.jekyll %>',
                    src: ['**/*.html', '**/*.md', 'feed.xml', 'sitemap.xml']
                }]
            },
            js: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= config.app %>',
                    dest: '<%= config.dist %>',
                    src: '<%= config.app %>/scripts/{,*/}*.js'
                }]
            },
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= config.app %>',
                    dest: '<%= config.dist %>',
                    src: [
                        '*.{ico,png,txt}',
                        '.htaccess',
                        'images/{,*/}*.webp',
                        'assets/**/*.*',
                        'bower_components/leaflet/dist/leaflet.*',
                        'bower_components/leaflet/dist/images/*.*',
                        '!**/_*{,/**}'
                    ]
                }, {
                    expand: true,
                    flatten: true,
                    cwd: '<%= config.app %>',
                    dest: '<%= config.dist %>/fonts',
                    src: [
                        'styles/fonts/{,*/}*.*',
                        'bower_components/bootstrap/dist/fonts/*.*',
                        'bower_components/font-awesome/fonts/*.*',
                    ]
                }]
            },
            build: {
                files: [{
                    expand: true,
                    dot: false,
                    cwd: '.tmp/jekyll',
                    dest: '<%= config.dist %>',
                    src: ['**/*.html', '**./*.md', 'feed.xml', 'sitemap.xml']
                }, {
                    expand: true,
                    flatten: true,
                    cwd: '<%= config.app %>',
                    dest: '<%= config.dist %>/fonts',
                    src: [
                        'styles/fonts/{,*/}*.*',
                        'bower_components/bootstrap/dist/fonts/*.*',
                        'bower_components/font-awesome/fonts/*.*',
                    ]
                }, {
                    expand: true,
                    flatten: false,
                    cwd: '<%= config.app %>',
                    dest: '<%= config.dist %>',
                    src: 'CHANGELOG.json'
                }]
            },
            styles: {
                expand: true,
                dot: true,
                cwd: '<%= config.app %>/styles',
                dest: '.tmp/styles/',
                src: '{,*/}*.css'
            }
        },

        // Run some tasks in parallel to speed up build process
        concurrent: {
            server: [
                'copy:styles'
            ],
            test: [
                'copy:styles'
            ],
            dist: [
                'copy:styles',
                'imagemin',
                'svgmin'
            ]
        },

        jekyll: {
            options: {
                plugins: '<%= config.app %>/_plugins',
                bundleExec: true,
                src : '<%= config.jekyll %>',
            },
            dist: {
                options: {
                    dest: '.tmp/jekyll',
                    config: '_config.yml'
                }
            },
            serve: {
                options: {
                    dest: '<%= config.dist %>',
                    config: '_config.yml',
                    drafts: true
                }
            }
        },

        'git-describe': {
            'options': {
                'template': '{%=object%}{%=dirty%}',
                'failOnError': true,
            },
            'full': {
            }
        },

        replace: {
            gitversion: {
                src: ['<%= config.dist %>/CHANGELOG.json'],
                overwrite: true,
                replacements: [{
                    from: 'GIT_VERSION_INFO',
                    to: function() {
                        return grunt.option('gitRevision');
                    }
                }]
            }
        }
    });

    grunt.registerTask('saveRevision', function() {
        grunt.event.once('git-describe', function (rev) {
            grunt.option('gitRevision', rev);
        });
        grunt.task.run(['git-describe', 'replace']);
    });

    grunt.registerTask('serve', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'clean:server',
            'concurrent:server',

            'clean:dist',
            'jshint',
            'copy:jekyll',
            'autoprefixer',
            'jekyll:dist',
            'copy:build',
            'saveRevision',

            'configureProxies',
            'connect:livereload',
            'watch'
        ]);
    });

    grunt.registerTask('server', function (target) {
        grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
        grunt.task.run([target ? ('serve:' + target) : 'serve']);
    });

    grunt.registerTask('test', function (target) {
        if (target !== 'watch') {
            grunt.task.run([
                'clean:server',
                'concurrent:test',
                'autoprefixer'
            ]);
        }

        grunt.task.run([
            'connect:test',
            //'mocha'
        ]);
    });

    grunt.registerTask('build', [
        'clean:dist',
        'copy:jekyll',
        'useminPrepare',
        'concurrent:dist',
        'autoprefixer',
        'concat',
        'cssmin',
        'uglify',
        'copy:dist',
        'rev',
        'usemin',
        'jekyll:dist',
        'copy:build',
        'saveRevision',
        'htmlmin'
    ]);

    grunt.registerTask('default', [
        'newer:jshint',
        'test',
        'build'
    ]);
};
