(function(){
    'use strict';
    angular.module('LunchCheck', [])
    .controller('LunchCheckController', LunchCheckController);



    LunchCheckController.$inject = ['$scope'];
    function LunchCheckController($scope) {
        $scope.menu = "";
        $scope.message = "";
        $scope.messageClass = "";


        $scope.handleCheckIfTooMuch = function (){
            let menuList = $scope.menu.split(',');
            menuList = stripMenuListFromEmptyElements(menuList);
            let isSuccess = setMessage(menuList.length);
            setMessageClass(isSuccess);
        }
        
        
        function stripMenuListFromEmptyElements(menuList) {
            return menuList.reduce((prev, item)=>{
                if(item.trim() !== '') return [...prev, item];
                return prev;
            }, [])
        }

        function setMessage(menuSize) {
            if(menuSize == 0) {
                $scope.message = "Please enter data first";
                return false;
            }
            if(menuSize <= 3) {
                $scope.message = 'Enjoy!';
                return true;
            }
            $scope.message = "Too much!";
            return true;
        }

        function setMessageClass(isSuccess) {
            if(isSuccess) {
                $scope.messageClass = "success";
                return;
            }
            $scope.messageClass = "failed";
        }
    }
})();