module.exports = function(grunt) { 
    grunt.initConfig({
        less: {
            development: {
                options: {
                    paths: ['content/css']
                },
                files: {
                    'min/css/themes/bootcamp/bootcamp.min.debug.css': 'content/css/themes/bootcamp.less'
                }
            },
            production: {
                options: {
                    paths: ['content/css'],
                    yuicompress: true
                },
                files: {
                    'min/css/themes/bootcamp/bootcamp.min.css': 'content/css/themes/bootcamp.less'
                }
            }
        }
    });
    
    grunt.loadNpmTasks('grunt-contrib-less');

    grunt.registerTask('default', ['less']);
};
