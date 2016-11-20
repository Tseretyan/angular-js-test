(function(){
    'use strict';

    angular.module('module2-solution',[])
    .controller('MainController', MainController)
    .controller('ToBuyListController',ToBuyListController)
    .controller('BoughtListController',BoughtListController)
    .service("EmptyListService", EmptyListService)
    .provider("GroceryListService", GroceryListProvider)
    .config(Config);

    
    Config.$inject = ['GroceryListServiceProvider'];
    function Config(GroceryListServiceProvider){
        GroceryListServiceProvider.settings.initialData = [
             {Name: "Meat", Qty: "1 lb"}
            ,{Name: "Milk", Qty: "1 gallon"}
            ,{Name: "Beans", Qty: "10 cans"}
            ,{Name: "Mango", Qty: "2"}
            ,{Name: "Coffee", Qty: "1lb"}
            ];
    }

    function GroceryListProvider(){
        var provider = this;

        provider.settings = {
            maxItems: 12
        };

        provider.$get = function(){
            var service = new GroceryListService(provider.settings);
            return service;
        }
    }

    function EmptyListService(){
    }

    EmptyListService.prototype = new GroceryListService();

    function GroceryListService(settings){
        var service = this;
        var items = [];
        var maxItems = 1000;

        if (settings) { 
            maxItems = settings.maxItems;

            if (settings.initialData && settings.initialData.length > 0){
                settings.initialData.forEach(function(e,idx){
                    items.push(e);
                });
            }
        }

        service.getItems = function(){
            return items;
        };

        service.remove = function(idx){
            if (idx < 0 || items.length <= idx) {
                return;
            }
            return items.splice(idx,1)[0];
        };

        service.add = function(itm){
            if (!itm || !("Name" in itm) || !("Qty" in itm)){
                return "Invalid item";
            }

            if (items.length >= maxItems){
                return "List is full";
            }

            var exist = false;

            items.forEach(function(e,idx){
                if (e.Name.toLowerCase() === itm.Name.toLowerCase()){
                    exist = true;
                }
            });

            if (exist){
                return "Item already exists";
            }

            items.push(itm);
        };
    }

    function MainController(){
    }

    ToBuyListController.$inject = ["GroceryListService","EmptyListService"];
    function ToBuyListController (GroceryListService,EmptyListService){
        var ctrl = this;
        ctrl.items = GroceryListService.getItems();

        ctrl.buyItem = function(idx){
            var itm = GroceryListService.remove(idx);
            EmptyListService.add(itm);
        }
    };

    BoughtListController.$inject =["EmptyListService"]
    function BoughtListController(EmptyListService)
    {
        var ctrl = this;
        ctrl.items = EmptyListService.getItems();
    }
})();