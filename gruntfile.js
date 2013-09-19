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
                command: 'node_modules/jasmine-node/bin/jasmine-node specs'
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-shell');

    grunt.registerTask('default', ['shell:jasmine']);
};