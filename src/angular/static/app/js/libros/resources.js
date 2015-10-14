demo.factory('Libros', ['$resource', '$api',
    function($resource, $api) {
        alert('HOLA')
        return $resource($api.url('libros/:id'), {id: '@id'})
    }
]);