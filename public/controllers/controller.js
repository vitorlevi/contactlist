
var myApp = angular.module('myApp', []);

myApp.controller("AppCtrl", ['$scope', '$http', function($scope, $http) { 
	
	var refresh = function (){
		$http.get('/items').success(function (response){
			
			console.log("I got the data I requested");
			$scope.items = response;
		});
	};
	refresh();

	$scope.addContact = function (){
		
		$http.post('/items', $scope.contact).success(function (response){
			console.log(response);
			refresh();
		});
	};

	$scope.removeContact = function (id){
		
		console.log(id);
		$http.delete('/items/' + id).success(function (response){
			refresh();
		});
	};

	$scope.editContact = function (id){
		
		console.log(id);
		$http.get('/items/' + id).success(function (response){
			$scope.contact = response;
		});
	};

	$scope.update = function (){
		console.log($scope.contact._id);
		$http.put('/items/' + $scope.contact._id, $scope.contact).success(function (response) {
			refresh();
		});
	};
}]);﻿