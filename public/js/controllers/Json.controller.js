angular.module('JsonCtrl', []).controller('JsonController', function($scope, JsonService) {

	$scope.error = false;
	$scope.errorMessage;
	$scope.sucessMessage = null;
	$scope.setJson = setJson;
	$scope.expectedFormat = 'JSON expected format: [["Title", numeric_value1, numeric_value2],["Title 02", numeric_value3]]';

	function setJson(){
		try{
			JsonService.setJson($scope.json);
			$scope.error = JsonService.isError;
		}catch(e){
			$scope.error = true;
			$scope.errorMessage = e;
		}

		if(!$scope.error){
			$scope.sucessMessage = 'Cool! Now you are good to go. Just click in "Draw Canvas".';
		}
	}
});