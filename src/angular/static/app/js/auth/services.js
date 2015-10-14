demo.factory('SessionService', [
    '$base64', '$localStorage', '$timeout',
    function($base64, $localStorage, $timeout) {
        var serviceDefinitionObject = {
            destroy: function() {
                $localStorage.$reset();
            },
            getToken: function() {
                return $localStorage.token;
            },
             setToken: function(token) {

                return new Promise(function (resolve, data) {
                    var parts = token.split('.');
                    var payload = angular.fromJson(atob(parts[1]));
                    $localStorage.token = token;
                    $localStorage.session = payload;
                    validate = $timeout(function(){
                        resolve(payload);
                    }, 500);
                });
            },
            setUserData: function (value) {

                return new Promise(function (resolve, data) {
                    $localStorage.userName = value.nombre;
                    resolve($localStorage.userName);
                });
            },
        };

        return serviceDefinitionObject;
    }
]);


demo.factory('AuthService', [
    '$window', 'Auth', 'SessionService', '$location',
    function($window, Auth, $location) {
        var serviceDefinitionObject = {
            login: function(credentials) {
                var auth = new Auth(credentials);

                auth.$login(
                    function(data, getResponseHeaders) {
                        if (data.callbackUrl !== undefined) {
                            $window.location.href = data.callbackUrl;
                        }
                    },
                    function(response) {
                    }
                );
            },
            registro: function(credentials) {
                var auth = new Auth(credentials);

                auth.$registro(
                    function(data) {

                        if (data.callbackUrl !== undefined) {
                            $window.location.href = '/servicios/verificar?callback_url=' + encodeURIComponent(data.callbackUrl);
                        }
                    },
                    function(response) {
                    }
                );
            },
            activar: function(credentials) {
                var auth = new Auth(credentials);

                auth.$activar(
                    function(data, getResponseHeaders) {
                        
                        $window.location.href = data.callbackUrl;

                    },
                    function(response) {
                    }
                );
            }
        };

        return serviceDefinitionObject;
    }
]);

demo.factory('ValidateTokens', [
    '$localStorage', '$timeout', 'Auth', 'SessionService',
    function($localStorage, $timeout, Auth, SessionService) {
        var serviceDefinitionObject = {
            refresh: function(){

                var checkToken = new Auth({
                    token: $localStorage.token
                });

                return checkToken.$refrescarToken().then(function(data){
                    $localStorage.token = data.token;
                    var token = SessionService.setToken(data.token);
                    return true;

                },function(error){
                    delete $localStorage.session;
                    delete $localStorage.token;
                    return  false;
                });
            }
        };
        return serviceDefinitionObject;
    }
]);

demo.factory('newToken', function($localStorage, $interval, Auth, ValidateTokens, Refresh, SessionService){
    var serviceDefinitionObject = {
            refresh: function(){

                var validate;
                if ($localStorage.token) {

                    if ($localStorage.session.exp < Math.round(new Date().getTime() / 1000) ) {
                        Auth.crearToken(function(data){

                            var token = SessionService.setToken(data.token);
                            token.then(function (data) {
                                return true;
                            });

                        });

                    }else{

                        if (Refresh === 1) {
                            Refresh = 2;
                            ValidateTokens.refresh();
                            validate = $interval(function(){
                                ValidateTokens.refresh();
                            }, 240000);
                        }
                    }
                }
            }
        };
        return serviceDefinitionObject;
});

demo.factory('validateUser', function(SessionService, DataPerfil, Auth, newToken){
    var serviceDefinitionObject = {
        refresh: function(){
            var user =  new DataPerfil();
            return user.$getuser().then(function(perfil){

              newToken.refresh();
              return perfil;

            },
            function(error){

                Auth.crearToken(function(data){

                    var token = SessionService.setToken(data.token);
                    token.then(function (data) {

                        DataPerfil.getuser(function(perfil){
                            newToken.refresh();
                            return perfil;
                        });

                    });

                });

            });
        }
    };
    return serviceDefinitionObject;
});
