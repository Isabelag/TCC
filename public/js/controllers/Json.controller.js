angular.module('JsonCtrl', []).controller('JsonController', function($scope, JsonService) {
	$scope.setJson = setJson;

	function setJson(){
		JsonService.setJson($scope.jsonFromInput);
	}
});