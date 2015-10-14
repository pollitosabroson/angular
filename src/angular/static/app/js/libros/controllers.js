demo.controller('LibrosCtrl',
    function($scope, librosLista) {
        $scope.books = librosLista;
        console.log(librosLista)
    }
);
