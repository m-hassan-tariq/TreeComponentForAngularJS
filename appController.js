(function () {
    'use strict';
	
	var app = angular
        .module('sampleApp', []);
	
    app.controller('HomeController', homeController);
 
    homeController.$inject = [];
 
    function homeController() {
        var vm = this;
 
        init();
 
        function init() {
            vm.detailList = [];
            vm.ID = 0;
            vm.parentRecord = {};
            addRootNode();
            vm.AddSibling = AddSibling;
            vm.AddChild = AddChild;
            vm.Delete = Delete;
        }
 
        ////////////////////////////Implementation//////////////////////////////////////
 
        function AddSibling(item) {
            if (item.parentId == 0) {
                addRootNode();
            }
            else {
                findParentRecord(vm.detailList, item.parentId);
                if (vm.parentRecord) {
                    AddChild(vm.parentRecord);
                }
            }
        }
 
        function AddChild(item) {
            var depth = findNodeLevel(vm.detailList, item.ID);
            if (depth < 7) {
                vm.ID = vm.ID + 1;
                item.nodes.push({
                    nodes: [],
                    parentId: item.ID,
                    ID: vm.ID
                });
            }
            else
                alert('maximum level has been reached');
        }
 
        function Delete(item) {
            if (item.nodes.length > 0)
                alert('delete children first');
            else {
                DeleteChild(vm.detailList, item.parentId, item);
            }
        }
 
        ////////////////////////////Helping Function//////////////////////////////////////
 
        function addRootNode() {
            vm.ID = vm.ID + 1;
            vm.detailList.push({
                nodes: [],
                parentId: 0,
                ID: vm.ID
            });
        }
 
        function findParentRecord(arr, parentId) {
            for (var i in arr) {
                if (typeof (arr[i]) == "object") {
                    if (arr[i].ID == parentId) {
                        vm.parentRecord = arr[i];
                        break;
                    }
                    else
                        findParentRecord(arr[i], parentId);
                }
            }
        }
 
        function DeleteChild(arr, parentId, item) {
            for (var i in arr) {
                if (typeof (arr[i]) == "object") {
                    if (arr[i].ID == parentId) {
                        var childrenList = arr[i].nodes;
                        var index = findIndex(childrenList, item.ID);
                        if (index > -1)
                            childrenList.splice(index, 1);
                        break;
                    }
                    else
                        DeleteChild(arr[i], parentId, item);
                }
            }
        }
 
        function findIndex(arr, selectedItemID) {
            for (var i in arr) {
                if (arr[i].ID == selectedItemID)
                    return i;
            }
            return -1;
        }
 
        function findNodeLevel(arr, id) {
            var level = 1;
            findParentRecord(arr, id)
            while (vm.parentRecord.parentId > 0) {
                level = level + 1;
                findParentRecord(arr, vm.parentRecord.parentId);
            }
            return level;
        }
    };
})();
