angular.module('JsonCtrl', []).controller('JsonController', function($scope, JsonService) {
	$scope.setJson = setJson;
	$scope.errorMessage = null;
	$scope.error = false;
	$scope.errorClass = null;

	function setJson(){
		try{
			JsonService.setJson($scope.jsonFromInput);
			$scope.errorClass = 'alert alert-success';
			$scope.errorMessage = 'Cool! Now you are good to go. Just click in Draw Canvas';
			$scope.error = true;
		}catch(exception){
			$scope.errorClass = 'alert alert-danger';
			$scope.errorMessage = exception;
			$scope.error = true;
		}
	}
});