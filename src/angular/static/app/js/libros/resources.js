demo.factory('Libros', ['$resource', '$api',
    function($resource, $api) {
        return $resource(
            $api.url('libros/:id'),
            {id: '@id'},
            {
                lista: {
                    method: 'GET',
                    url: $api.url('libros/'),
                    isArray: true
                }
            }
        );
    }
]);