demo.config([
    '$contentProvider', '$stateProvider',
    function($contentProvider, $stateProvider) {
        $stateProvider
            .state('libros', {
                url: 'libros',
                templateUrl: $contentProvider.url('libros/base.html'),
                abstract: true
            })
            .state('libros.lista', {
                url: '',
                templateUrl: $contentProvider.url('app/partials/home/base.html'),
                controller: 'LibrosCtrl',
                resolve: {
                    librosLista: function(Libros) {
                        alert('hola')
                        return Libros.query().$promise;
                    }
                }                    
                
            })

    }
]);