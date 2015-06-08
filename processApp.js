var app = angular.module('processApp', ['ngMaterial']);

app.config(function($mdIconProvider) {
        $mdIconProvider.icon('details', 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/68133/menu.svg')
});

app.controller('AppCtrl', ['$scope', '$http', '$mdSidenav', function($scope, $http, $mdSidenav){

        $scope.data = {
                "results" : []
        };

        $scope.showGraph = false;
        $scope.graphPath = "http://localhost:8080/buildings-process-flow.png";

        $http.get('http://localhost:8080/task_listview.json')
            .success(function(res){    
                    $scope.data.results = res.results;
            }).error(function(err) {
            });

        $scope.toggleProcessGraph = function($event) {
                var elem = $event.target;
                var addLocation = elem.parentNode.parentNode;
                var img = angular.element("<img flex layout-align=\"center center\" src=" + $scope.graphPath + " style=\"width: 300px; height: 300px\"/>");

                if ($scope.showGraph == false) {
                        angular.element(addLocation).append(img);
                        $scope.showGraph = true;
                }
                else {
                        var delEntry = angular.element(addLocation).find("img");
                        angular.element(delEntry).remove();
                        $scope.showGraph = false;
                }
        };
        

        $scope.sidenavOpen = function() {
                $mdSidenav("right").open();

        };
        $scope.sidenavClose = function() {
                $mdSidenav("right").close();
        };
        
}]);

