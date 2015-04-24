module.exports = function (grunt) {
  'use strict';

  // Force use of Unix newlines
  grunt.util.linefeed = '\n';

  RegExp.quote = function (string) {
    return string.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');
  };

  // Project configuration.
  grunt.initConfig({

    // Metadata.
    pkg: grunt.file.readJSON('package.json'),

    // Web application root.
    webroot: 'src/main/webapp',

    // JS header.
    banner: '/*!\n' +
            ' * <%= pkg.name %>.js v<%= pkg.version %> \n' +
            ' */\n',
    jqueryCheck: 'if (typeof jQuery === \'undefined\') {\n' +
                 '  throw new Error(\'Bootstrap\\\'s JavaScript requires jQuery\')\n' +
                 '}\n',
    jqueryVersionCheck: '+function ($) {\n' +
                        '  \'use strict\';\n' +
                        '  var version = $' + '.fn.jquery.split(\' \')[0].split(\'.\')\n' +
                        '  if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1)) {\n' +
                        '    throw new Error(\'Bootstrap\\\'s JavaScript requires jQuery version 1.9.1 or higher\')\n' +
                        '  }\n' +
                        '}(jQuery);\n\n',

    // Task configuration.
    clean: {
      bower: 'bower_components',
      dist: 'dist',
      deploy: ['<%= webroot %>/css', '<%= webroot %>/js', '<%= webroot %>/libs']
    },

    jshint: {
      options: {
        jshintrc: 'js/.jshintrc'
      },
      core: {
        src: 'js/*.js'
      }
    },

    jscs: {
      options: {
        config: 'js/.jscsrc'
      },
      core: {
        src: '<%= jshint.core.src %>'
      }
    },

    concat: {
      options: {
        banner: '<%= banner %>\n<%= jqueryCheck %>\n<%= jqueryVersionCheck %>',
        stripBanners: false
      },
      core: {
        src: 'js/*.js',
        dest: 'dist/js/<%= pkg.name %>.js'
      }
    },

    uglify: {
      options: {
        preserveComments: 'some'
      },
      core: {
        options: {
          sourceMap: true
        },
        src: '<%= concat.core.dest %>',
        dest: 'dist/js/<%= pkg.name %>.min.js'
      },
      modernizr: {
        src: '<%= webroot %>/libs/js/modernizr.js',
        dest: '<%= webroot %>/libs/js/modernizr.min.js'
      },
      respond: {
        src: '<%= webroot %>/libs/js/respond.proxy.js',
        dest: '<%= webroot %>/libs/js/respond.proxy.min.js'
      }
    },

    less: {
      compileCore: {
        options: {
          strictMath: true,
          sourceMap: true,
          outputSourceFiles: true,
          sourceMapURL: '<%= pkg.name %>.css.map',
          sourceMapFilename: 'dist/css/<%= pkg.name %>.css.map'
        },
        src: 'less/<%= pkg.name %>.less',
        dest: 'dist/css/<%= pkg.name %>.css'
      }
    },

    autoprefixer: {
      options: {
        browsers: ["Android 2.3",
                   "Android >= 4",
                   "Chrome >= 20",
                   "Firefox >= 24",
                   "Explorer >= 8",
                   "iOS >= 6",
                   "Opera >= 12",
                   "Safari >= 6"
        ]
      },
      core: {
        options: {
          map: true
        },
        src: 'dist/css/<%= pkg.name %>.css'
      }
    },

    csslint: {
      options: {
        csslintrc: 'less/.csslintrc'
      },
      dist: 'dist/css/<%= pkg.name %>.css'
    },

    cssmin: {
      options: {
        compatibility: 'ie8',
        keepSpecialComments: '*',
        noAdvanced: true
      },
      minifyCore: {
        src: 'dist/css/<%= pkg.name %>.css',
        dest: 'dist/css/<%= pkg.name %>.min.css'
      }
    },

    csscomb: {
      options: {
        config: 'less/.csscomb.json'
      },
      dist: {
        expand: true,
        cwd: 'dist/css/',
        src: ['*.css', '!*.min.css'],
        dest: 'dist/css/'
      }
    },

    copy: {
      deploy: {
        files: [
          {
            expand: true,
            cwd: 'dist/css/',
            src: '*',
            dest: '<%= webroot %>/css/'
          },
          {
            expand: true,
            cwd: 'dist/js/',
            src: '*',
            dest: '<%= webroot %>/js/'
          }
        ]
      }
    },

    watch: {
      less: {
        files: 'less/**/*.less',
        tasks: 'dist-css'
      }
    },

    exec: {
      npmUpdate: {
        command: 'npm update'
      }
    },

    'bower-install-simple': {
      options: {
        color: true,
        directory: 'bower_components'
      },
      dist: {
        production: false
      }
    },

    bowercopy: {
      options: {
        srcPrefix: 'bower_components'
      },
      dist: {
        options: {
          destPrefix: '<%= webroot %>'
        },
        files: {
          'libs/css/bootstrap.css.map': 'bootstrap/dist/css/bootstrap.css.map',
          'libs/css/bootstrap.min.css': 'bootstrap/dist/css/bootstrap.min.css',
          'libs/fonts/glyphicons-halflings-regular.eot': 'bootstrap/dist/fonts/glyphicons-halflings-regular.eot',
          'libs/fonts/glyphicons-halflings-regular.svg': 'bootstrap/dist/fonts/glyphicons-halflings-regular.svg',
          'libs/fonts/glyphicons-halflings-regular.ttf': 'bootstrap/dist/fonts/glyphicons-halflings-regular.ttf',
          'libs/fonts/glyphicons-halflings-regular.woff': 'bootstrap/dist/fonts/glyphicons-halflings-regular.woff',
          'libs/js/bootstrap.min.js': 'bootstrap/dist/js/bootstrap.min.js',
          'libs/js/html5shiv.min.js': 'html5shiv/dist/html5shiv.min.js',
          'libs/js/jquery.min.js': 'jquery/dist/jquery.min.js',
          'libs/js/jquery.min.map': 'jquery/dist/jquery.min.map',
          'libs/js/jquery-1x/jquery.min.js': 'jquery-1x/dist/jquery.min.js',
          'libs/js/jquery-1x/jquery.min.map': 'jquery-1x/dist/jquery.min.map',
          'libs/js/jquery-jsonp.js': 'jquery-jsonp/src/jquery.jsonp.js',
          'libs/js/modernizr.js': 'modernizr/modernizr.js',
          'libs/js/respond-proxy.html': 'respond-minmax/cross-domain/respond-proxy.html',
          'libs/js/respond.min.js': 'respond-minmax/dest/respond.min.js',
          'libs/js/respond.proxy.gif': 'respond-minmax/cross-domain/respond.proxy.gif',
          'libs/js/respond.proxy.js': 'respond-minmax/cross-domain/respond.proxy.js',
        }
      }
    }
  });


  // These plugins provide necessary tasks.
  require('load-grunt-tasks')(grunt, { scope: 'devDependencies' });
  require('time-grunt')(grunt);

  // JS distribution task.
  grunt.registerTask('test-js', ['jshint:core', 'jscs:core']);
  grunt.registerTask('dist-js', ['concat', 'uglify:core']);

  // Lib initialization task.
  grunt.registerTask('initialize', ['bowercopy:dist', 'uglify:respond', 'uglify:modernizr']);

  // CSS distribution task.
  grunt.registerTask('dist-css', ['less:compileCore', 'autoprefixer:core', 'csscomb:dist', 'cssmin:minifyCore']);

  // Full distribution task.
  grunt.registerTask('dist', ['clean:dist', 'dist-css', 'test-js', 'dist-js', 'bowercopy:dist', 'uglify:respond', 'uglify:modernizr']);

  // Deploy-to-webapps task.
  grunt.registerTask('deploy', ['dist', 'copy:deploy']);

  // Default task.
  grunt.registerTask('default', 'deploy');
};
