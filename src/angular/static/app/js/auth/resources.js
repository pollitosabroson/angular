demo.factory('Auth', [
    '$api', '$resource',
    function($api, $resource) {
        return $resource($api.url('auth'), null, {
            login: {
                method: 'post',
                url: $api.url('auth/login'),
                isArray: false,
                withCredentials: true
            },
            registro: {
                method: 'post',
                url: $api.url('auth/registro'),
                isArray: false,
                withCredentials: true
            },
            activar: {
                method: 'post',
                url: $api.url('auth/activar'),
                isArray: false
            },
            refrescarToken: {
                method: 'post',
                url: $api.url('auth/refrescar-token'),
                isArray: false
            },
            crearToken: {
                method: 'get',
                url: $api.url('auth/crear-token'),
                isArray: false,
                withCredentials: true
            }
        });
    }
]);
