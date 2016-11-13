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
			var canvasListOnlyNumber = filterOnlyNumbers(index);
			getCoordinates(index, canvasListOnlyNumber, 'create', null);
			$scope.paragraphTitle = canvasMatrix[index][0];
			index++;
		});
	}

	function sortCanvas(index){
		if(index >= 0){
			var canvas = document.getElementById('canvas'+index);
			if(canvas){
				var context = canvas.getContext("2d");
            	var sortedNumericList = _.sortBy(filterOnlyNumbers(index));
				context.clearRect(0, 0, canvas.width, canvas.height);
            	getCoordinates(index, sortedNumericList, 'update', context);

            	createScale(index);	
			}
		}
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
		var canvasGradient = document.getElementById("canvasScale");
		var context = canvasGradient.getContext("2d");

		var finalGradient = context.createLinearGradient(0, 0, 0, 255);
		var numericList = filterOnlyNumbers(index);
		var maxValue = CanvasService.getMaxValue(numericList);
		var minValue = CanvasService.getMinValue(numericList);

		$scope.canvasScaleMaxValue = maxValue;
		$scope.canvasScaleMinValue = minValue;

		var maxColor = 'rgb(0,0,' + maxValue + ')';
		var minColor = 'rgb(0,0,' + minValue + ')';

		finalGradient.addColorStop(0, minColor);
		finalGradient.addColorStop(1, maxColor);

		context.fillStyle = finalGradient;
		context.fillRect(0, 0, 50, 500);
	}

});