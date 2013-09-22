module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        watch: {
            scripts: {
                files: [__dirname + '/openure.js'],
                tasks: ['shell:jasmine'],
                options: {
                    nospawn: false
                }
            }
        },
        shell: {
            jasmine: {
                options: {
                    stdout: true
                },
                command: [
                    'cp openure.js node_modules',
                    'cp spec_helper.js node_modules',
                    'node_modules/jasmine-node/bin/jasmine-node --growl specs'
                ].join('&&')
            }
        },
        connect: {
            server: {
                options: {
                    port: 9000,
                    base: '.',
                    protocol: 'https'
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.registerTask('default', ['shell:jasmine']);
};