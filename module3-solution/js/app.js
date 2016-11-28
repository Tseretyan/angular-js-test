(function(){
    'use strict';

    angular.module('module3-solution',[])
    .controller('MainController', MainController)
    .service('ApiService',ApiService)
    .directive('foundItems', FoundItemsDirective)
    .constant('ApiEndpoint',"https://davids-restaurant.herokuapp.com");


    ApiService.$inject = ["$http", 'ApiEndpoint'];
    function ApiService($http, ApiEndpoint){
        var service = this;

        var getFilter = function(filter){
                if (!filter || filter === "") return null; 
                var lowerFilter = filter.toLowerCase().trim();
                return function(itm){
                    return itm.name.toLowerCase().indexOf(lowerFilter) >= 0 || itm.special_instructions.toLowerCase().indexOf(lowerFilter) >= 0;
                }
            };

        service.getCategories = function(filterText){
            var filter = getFilter(filterText);
            return $http({
                method: 'GET',
                url: ApiEndpoint + '/categories.json'
            }).then(function(r){
                return filter ? r.data.filter(filter) : r.data;
            });
        };
    };
    
    MainController.$inject = ["ApiService"]
    function MainController(ApiService){
        var ctrl = this;
        ctrl.searchText="";
        ctrl.Loading = false;
        ctrl.search = function(txtToSearch){
            ctrl.Loading = true;
            ApiService.getCategories(txtToSearch).then(function(r){
                ctrl.foundItems = r;
                console.log(r); 
            }, function(err){
                console.error(err);
            }) 
        }
        ctrl.remove = function(idx){
            ctrl.foundItems.splice(idx,1);
        }
    };

    function FoundItemsDirective(){
        var ddo = {
            restrict: 'E',
            templateUrl: 'templates/foundItems.html',
            scope: {
                foundItems: '<',
                remove: '&onRemove'
            }
        }

        return ddo;
    }
})();