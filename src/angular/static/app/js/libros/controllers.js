demo.controller('LibrosCtrl',
    function($scope, $api, Libros) {

        $scope.libros = Libros.lista();

    }
);
