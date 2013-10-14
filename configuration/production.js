define('configuration/bootcamp/production', ['configuration/production', 'Mobile/Bootcamp/ApplicationModule'], function(baseConfiguration, BootcampApplicationModule) {
    return mergeConfiguration(baseConfiguration, {
        modules: [
            new BootcampApplicationModule()
        ]
    });
});
