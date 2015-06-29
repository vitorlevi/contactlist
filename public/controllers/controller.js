
var myApp = angular.module('myApp', []);

myApp.factory('socket', function (){
	var socket  = io.connect('mongodb://dbconnect:123456@ds033750.mongolab.com:33750/mongobase');
	return socket;
})


myApp.controller("AppCtrl", ['$scope', '$http', function($scope, $http) { 
	 var socket = io();
	 socket.emit('chat message', "test message");

	 socket.on('chat message', function(msg){
	   console.log(msg);
	  });
	var refresh = function (){
		$http.get('/items').success(function (response){
			
			console.log("I got the data I requested");
			$scope.items = response;
		});
	};
	refresh();
	// $scope.contact = [];
	$scope.addContact = function (){
		
		$http.post('/items', $scope.contact).success(function (response){
			console.log(response);
			refresh();
		});
		socket.emit('send item', $scope.contact);
	};
	socket.on('get item', function (data){
		$scope.contact.push(data);
		$scope.$digest();		
	});

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