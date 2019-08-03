(function(){
    'use strict';

    angular.module('app', [])
    .controller('BoughtListController', BoughtListController)
    .controller('ToBuyListController', ToBuyListController)
    .service('ShoppingListService', ShoppingListService);


    BoughtListController.$inject = ['ShoppingListService'];
    function BoughtListController(ShoppingListService) {
        var boughtCtrl = this;
        boughtCtrl.items = ShoppingListService.getBoughtList();
        boughtCtrl.showEmptyMessage = ShoppingListService.isBoughtListEmpty;
    }

    ToBuyListController.$inject = ['ShoppingListService'];
    function ToBuyListController(ShoppingListService) {
        var toBuyCtrl = this;
        toBuyCtrl.items = ShoppingListService.getToBuyList();
        toBuyCtrl.buyAnItem = ShoppingListService.buyAnItem;
        toBuyCtrl.showEmptyMessage = ShoppingListService.isToBuyListEmpty;
    }

    function ShoppingListService() {
        var service = this;
        var toBuyList = [{ name: "cookies", quantity: 10 }, { name: "Chips", quantity: 12 }, { name: "apples", quantity: 15 }, { name: "eggs", quantity: 30 }, { name: "bags", quantity: 20 }];
        var boughtList = [];

        service.getBoughtList = function() {
            return boughtList;
        }
        service.getToBuyList = function() {
            return toBuyList;
        }
        service.isToBuyListEmpty = function() {
            return toBuyList.length === 0;
        }
        service.isBoughtListEmpty = function() {
            return boughtList.length === 0;
        }
        service.buyAnItem = function(idx) {
            boughtList.push(toBuyList[idx]);
            toBuyList.splice(idx,1);
        }
    }
})()