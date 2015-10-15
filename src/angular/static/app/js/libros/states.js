demo.config([
    '$contentProvider', '$stateProvider',
    function($contentProvider, $stateProvider) {
        $stateProvider
            .state('libros', {
                url: '/',
                templateUrl: $contentProvider.url('libros/base.html'),
                abstract: true
            })
            .state('libros.lista', {
                url: '',
                templateUrl: $contentProvider.url('libros/lista.html'),
                controller: 'LibrosCtrl',
                /*resolve: {
                    librosLista: function() {
                        return Libros.$lista().$promise;
                    }
                }*/                    
                
            })

    }
]);