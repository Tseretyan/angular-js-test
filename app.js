(function(){
    'use strict';

    angular.module('angular-js-test',[])
    .controller('MainController', DIController);

    DIController.$inject = ["$scope", "$filter"];

    function DIController ($scope,$filter){
        $scope.name = "Yuri";

        $scope.say = function(){
            return "Test 123 43";
        };
    };
})();