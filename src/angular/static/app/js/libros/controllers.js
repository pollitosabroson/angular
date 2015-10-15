demo.controller('LibrosCtrl',
    function($scope, $api, Libros) {
    	console.log($api.url(''))
        $scope.books = Libros.lista();
        console.log(Libros.lista())

    }
);
