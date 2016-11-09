(function(){
    'use strict';

    angular.module('module1-solution',[])
    .controller('MainController', DIController);

    DIController.$inject = ["$scope", "$filter"];

    function DIController ($scope,$filter){
        var maxItems = 3;
        $scope.menu = "";
        $scope.status = 0;
        $scope.hasEmpty = false;

        $scope.checkMenu = function(){
            var menu = $scope.menu;
            var i = 0;
            if (menu.length > 0){
                var items = menu.split(',');
                items.forEach(function(element) {
                    if (element.trim().length >0 ){
                        i++;
                    }
                    else{
                        $scope.hasEmpty = true;
                    }
                }, this);
            }
            if (i == 0){
                $scope.status = 1;
            }
            else if (i <= maxItems){
                $scope.status = 2;
            }
            else{
                $scope.status = 3;
            }
        };

        $scope.getMessage = function(){
            switch ($scope.status){
                case 1:
                    return "Please enter data first";
                case 2: 
                    return "Enjoy!";
                case 3: 
                    return "Too much!";
                default: 
                    return "";
            }
        }
    };
})();