(function() {
    'use strict';

    angular
        .module('myApp')
        .factory('ToDoFactory', ToDoFactory);

    ToDoFactory.$inject = ['$http', '$q'];

    /* @ngInject */
    function ToDoFactory($http, $q) {
        var service = {
        	toDoEvent: toDoEvent,
        	addToDo: addToDo,
        	editToDo: editToDo,
        	deleteToDo: deleteToDo
        	
            
        };
        return service;

        ////////////////

// pulls the entire database

        function toDoEvent() {
        	var deferred = $q.defer();

        	$http.get('http://localhost:55364/api/todoes').then(
        		function(response){
        			deferred.resolve(response.data);
        		},
        		function(error) {
        			deferred.reject(error);
        		}
        		);
        	return deferred.promise;
        }

// pushes the new event to the database

        function addToDo(todo) {
        	var deferred = $q.defer();

        	$http.post('http://localhost:55364/api/todoes',todo).then(
        		function(response){
        			deferred.resolve(response.data);
        		},
        		function(error) {
        			deferred.reject(error);
        		}
        		);
        	return deferred.promise;

// pushes changes to existing events

        }
        function editToDo(ToDo) {
        	var deferred = $q.defer();

        	$http.put('http://localhost:55364/api/todoes/' + ToDo).then(
        		function(response){
        			deferred.resolve(response.data);
        		},
        		function(error) {
        			deferred.reject(error);
        		}
        		);
        	return deferred.promise;

// deletes the associated event


        }
        function deleteToDo(ToDo) {
        	var deferred = $q.defer();

        	$http.delete('http://localhost:55364/api/todoes/' + ToDo).then(
        		function(response){
        			deferred.resolve(response.data);
        		},
        		function(error) {
        			deferred.reject(error);
        		}
        		);
        	return deferred.promise;

        }


    }
})();



