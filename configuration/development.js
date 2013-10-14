/**
 * Created by argos-sample.
 * User: jhershauer
 * Date: 4/15/11
 * Time: 12:35 PM
 * To change this template use File | Settings | File Templates.
 */
define('configuration/bootcamp/development', ['configuration/development', 'Mobile/Bootcamp/ApplicationModule'], function(baseConfiguration, BootcampApplicationModule) {
    return mergeConfiguration(baseConfiguration, {
        modules: [
            new BootcampApplicationModule()
        ]
    });
});
