demo.factory('TokenInterceptor', [
    '$api', '$browser','$localStorage',
    function($api, $browser, $localStorage) {
        var regex = new RegExp('^' + $api.url('').replace(/\//g, '\\/'));

        var interceptorDefinitionObject = {
            request: function(config) {

                if ($localStorage.token !== undefined) {
                    var token = $localStorage.token;

                    if ((config.url.match(regex) !== null) && (token !== undefined)) {
                        config.headers['Authorization'] = 'JWT ' + token;
                    }
                }
                return config;
            }
        };

        return interceptorDefinitionObject;
    }
]);

demo.factory('CSRFInterceptor', 
    function($browser, $cookies){
        var serviceDefinitionObject = {
            request: function(config){
                config.headers['X-CSRFToken'] = $cookies['csrftoken'];
                return config;
            },
            response: function(response) {
                return angular.extend($cookies, angular.copy($browser.cookies())), response;
            }
        }

        return serviceDefinitionObject;
    }
);
