/**
 * Created by YPANSHIN on 2017-02-08.
 */
module.exports = function (grunt) {
    var date = new Date();
    var year = date.getFullYear();
    var pkg = grunt.file.readJSON('package.json');
    var baseVersion = pkg.version;

    // Import dependencies
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-open');
    grunt.loadNpmTasks('grunt-ts');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-string-replace');
    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            dist: ['./dist'],
            build: ['./build']
        },
        concat: {
            style: {
                options: {
                    stripBanners: true
                },
                src: ['src/**/*.css'],
                dest: './build/style/style.css'
            }
        },
        copy: { // copy static files ot output directory
            blank:{
                expand: true,
                cwd: './assets/',
                src: ['**/*.*'],
                dest: './dist/sample',
                filter: 'isFile'
            },
            lib:{
                expand: true,
                src: ['./dist/lib/bots-sdk-chat.js'],
                dest: './dist/sample',
                flatten: true,
                filter: 'isFile'
            }
        },
        connect: {
            server: {
                options: {
                    port: 3000,
                    base: './dist/sample',
                    keepalive: true
                }
            }
        },
        ts: {
            lib: { // <-- compile all the files in ../ to PROJECT.js
                src: ['./templates/**/*.ts', './src/**/*.ts'],
                outDir: './build/es6/',
                options: {
                    rootDir: './',
                    target: 'es6',
                    sourceMaps: false,
                    declaration: true,
                    removeComments: false
                }
            }
        },
        babel: {
            options: {
                sourceMap: false,
                presets: ['es2015']
            },
            dist: {
                files: [{ expand: true,
                    cwd: './build/es6',
                    src: '**/*.js',
                    dest: './build/es5' }]
            }
        },
        browserify: {
            'bots-sdk-chat': {
                files: {'./dist/lib/bots-sdk-chat.js': ['./build/es5/src/main.js']},
                options: {
                    exclude: [],
                    banner: '/**\n' +
                    '* Copyright (c) ' + year + ', Oracle and/or its affiliates. All rights reserved.\n ' +
                    '* Oracle Chat Widget Web - Oracle bot chat client example, Release: ' + baseVersion + '\n' +
                    '*/\n\n\n'
                }
            }
        },
        watch: {
            lib: { // <-- Watch for changes on the library and rebuild both
                files: ['./src/**/**.*'],
                tasks: ['clean:lib','clean:templates', 'string-replace', 'ts:lib', 'clean:sourceMap']
            }
        },
        open: { // <--- Launch index.html in browser when you run grunt
            blank: {
                path: 'http://localhost:8089/Blank/index.html'
            }
        },
        'string-replace': { // convert html templates to typescript modules
            settings:{
                files: [{
                    src: './build/es6/src/core/settings.js',
                    dest: './build/es6/src/core/settings.js'
                }],
                options: {
                    replacements: [{
                        pattern: '{version}',
                        replacement: '<%= pkg.version %>'
                    }, {
                        pattern: '{name}',
                        replacement: '<%= pkg.name %>'
                    }]
                }
            },
            stylePrefix:{
                files: [{
                    src: ['./build/style/style.css'],
                    dest: './build/style/style.css'
                }],
                options: {
                    replacements: [{
                        pattern: /(\.([a-zA-Z_-]{1}[\w-_]+))/ig,
                        replacement: function (match, p1) {
                            console.log(match, p1);
                            return p1.replace('.', '.' + pkg.name + '-');
                        }
                    }]
                }
            },
            style:{
                files: [{
                    src: './build/es6/src/components/style/style.js',
                    dest: './build/es6/src/components/style/style.js'
                }],
                options: {
                    replacements: [{
                        pattern: '{style}',
                        replacement: '<%= grunt.file.read(\'./build/style/style.min.css\') %>'
                    }]
                }
            }
        },
        uglify: {
            'bots-sdk-chat': {
                options: {
                    stripBanners: true,
                    banner: '/**\n' +
                    '* Copyright (c) ' + year + ', Oracle and/or its affiliates. All rights reserved.\n ' +
                    '* Oracle Chat Widget Web - Oracle bot chat client example, Release: ' + baseVersion + '\n' +
                    '*/\n\n\n'
                },
                files: {
                    './dist/lib/bots-sdk-chat.min.js': './dist/lib/bots-sdk-chat.js'
                }
            }
        },
        cssmin:{
            style: {
                options: {
                    stripBanners: true
                },
                files: {
                    './build/style/style.min.css': './build/style/style.css'
                }
            }
        }
    });

    grunt.registerTask('build', ['clean', 'ts','concat:style', 'string-replace:stylePrefix','cssmin:style','string-replace:style', 'string-replace:settings', 'babel', 'browserify']);
    grunt.registerTask('serve', ['default', 'connect']);
    grunt.registerTask('default', ['build', 'uglify', 'copy']);
};
