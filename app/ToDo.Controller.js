(function() {
    'use strict';

    angular
        .module('myApp')
        .controller('ToDoController', ToDoController);

    ToDoController.$inject = ['$http', 'ToDoFactory'];

    /* @ngInject */

    // presents priority option and assign the option a value

    function ToDoController($http, ToDoFactory) {
        var vm = this;
        vm.options = [{
            "priority": "It can wait",
            "number": "1",
        }, {
            "priority": "Should get done soon",
            "number": "2",
        }, {
            "priority": "Complete ASAP",
            "number": "3",
        }];

        vm.toDos = [];

        activate();

        ////////////////

        function activate() {
            ToDoFactory.toDoEvent().then(
                function(todos) {

                },
                function(error) {}
            );
        }

        // Adds the new event to the list of event and send the info to factory -> c# -> sql

        vm.addToDo = function() {
            var newToDoEvent = {
                "ToDoItem": vm.newEvent,
                "ToDoPriority": vm.selectedOption,

            };
            vm.saving = true;
            ToDoFactory.addToDo(newToDoEvent).then(
                function(response) {
                    vm.saving = false;
                    vm.toDos.push(response);

                },
                function(error) {
                    alert('We couldnt save, You are SOL');
                }
            );


            // Allows for edit and events that have been created


        };
        vm.editToDo = function(todo) {
            ToDoFactory.editToDo(todo).then(
                function() {

                },
                function() {
                    alert('We couldnt edit, You are SOL');
                }
            );
        };

        // Allows for removal of event complete and/or no longer needed

        vm.deleteToDo = function(ToDo, $index) {
            ToDoFactory.deleteToDo(ToDo).then(
                function(response) {
                    vm.toDos.splice($index, 1)

                },
                function() {
                    alert('We couldnt delete, You are SOL');
                }
            );
        };

    }
})();
