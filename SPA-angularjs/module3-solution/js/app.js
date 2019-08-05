(function(){
    'use strict';

    angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .directive('foundItems', foundItems)
    .directive('loader', loader)
    .constant('BASE_API_URI', 'https://davids-restaurant.herokuapp.com');



    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
        var searchCtrl = this;
        searchCtrl.loading = false;
        searchCtrl.query = "";
        searchCtrl.search = function() {
            searchCtrl.loading = true;
            MenuSearchService.getMatchedMenuItems(searchCtrl.query).then(function(data){
                searchCtrl.found = data;
                searchCtrl.loading = false;
            })
        }
        searchCtrl.onRemove = function(idx) {
            searchCtrl.found.splice(idx, 1);
        }
    }

    MenuSearchService.$inject = ['$http', 'BASE_API_URI'];
    function MenuSearchService($http, BASE_API_URI) {
        var service = this;
        
        service.getMatchedMenuItems = function(searchTerm) {
            return $http({
                method: 'GET',
                url: BASE_API_URI + '/menu_items.json'
            }).then(function(data) {
                var menu_items = data.data.menu_items;
                return service.filterItems(menu_items, searchTerm);
            })
        }

        service.filterItems = function(items, searchTerm) {
            searchTerm = searchTerm.trim().toLowerCase();
            var res = items.filter((item) => {
                return searchTerm.length > 0 && item.description.toLowerCase().indexOf(searchTerm) !== -1;
            })
            return res
        }
        
    }
    
    function foundItems() {
        var dod = {
            templateUrl: 'foundItems.html',
            scope: {
                items: "<",
                onRemove:"&onRemove"
            }
        }

        return dod;
    }

    function loader() {
        var dod = {
            templateUrl: 'loader.html',
            scope: {
                loading: "<",
            }
        }

        return dod;
    }

    
})()