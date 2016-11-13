angular.module('CanvasCtrl', []).controller('CanvasController', function($scope, JsonService, CanvasService) {
	/*
	*  Public Variables
	*/
	$scope.canvasMatrixFromInput = JsonService.getJson();
	$scope.canvasScaleMaxValue = 0;
	$scope.canvasScaleMinValue = 0;
	
	/*
	*  Private Variables
	*/
	var canvasMatrix = $scope.canvasMatrixFromInput;

	/*
	*  Public Methods
	*/
	$scope.setCanvasId = setCanvasId;
	$scope.setDivId = setDivId;
	$scope.setParagraphId = setParagraphId;
	$scope.drawCanvas = drawCanvas;
	$scope.sortCanvas = sortCanvas;
	$scope.getParagraphTitle = getParagraphTitle;

	/*
	*  Public Methods - Implementation
	*/
	function setCanvasId(element){
		return 'canvas' + element;
	}

	function setDivId(element){
		return 'div' + element;
	}

	function setParagraphId(element){
		return 'paragraph' + element;
	}

	function drawCanvas(){
		var index = 0;
		_.each(canvasMatrix, function(current){
			var canvas = document.getElementById('canvas' + index);
			getCoordinates(index, canvasMatrix[index], 'create', null);
			index++;
		});
	}

	function sortCanvas(index){
		if(index >= 0){
			var canvas = document.getElementById('canvas'+index);
			if(canvas){
				var context = canvas.getContext("2d");
            	var sortedList = _.sortBy(canvasMatrix[index]);
				context.clearRect(0, 0, canvas.width, canvas.height);
            	getCoordinates(index, sortedList, 'update', context);

            	createScale(index);	
			}
		}
	}

	function getParagraphTitle(index){
		return canvasMatrix[index][0];
	}

	/*
	*  Private Methods - Implementation
	*/
	function getCoordinates(index, canvasList, type, context){
		return CanvasService.getCoordinates(index, canvasList, type, context);
	}

	function filterOnlyNumbers(index){
		return _.filter(canvasMatrix[index], function(element){
	        return _.isNumber(element);
	    });	
	}

	function createScale(index){
		var maxValue = 0;
		var minValue = 0;

		var canvasGradient = document.getElementById("canvasScale");
		var context = canvasGradient.getContext("2d");

		var canvasMaxMinMap = CanvasService.getCanvasMaxMinMap(index);

		maxValue = CanvasService.calculateElementColor(canvasMaxMinMap.max, index);
		minValue = CanvasService.calculateElementColor(canvasMaxMinMap.min, index);

		console.log('service-----------> element: ' + canvasMaxMinMap.max + ' color: ' + maxValue);
		console.log('service-----------> element: ' + canvasMaxMinMap.min + ' color: ' + minValue);

		$scope.canvasScaleMaxValue = canvasMaxMinMap.max;
		$scope.canvasScaleMinValue = canvasMaxMinMap.min;

		var finalGradient = context.createLinearGradient(0, 0, 0, 255);
		finalGradient.addColorStop(0, 'rgb(1,1,' + maxValue + ')');
		finalGradient.addColorStop(1, 'rgb(1,1,' + minValue + ')');

		context.fillStyle = finalGradient;
		context.fillRect(0, 0, 50, 500);
	}

});