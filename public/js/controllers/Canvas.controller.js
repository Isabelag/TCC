angular.module('CanvasCtrl', []).controller('CanvasController', function($scope, JsonService, CanvasService) {
	/*
	*  Public Variables
	*/
	/*
	$scope.canvasMatrixFromInput = JsonService.getJson();
	$scope.canvasScaleMaxValue = 'Max';
	$scope.canvasScaleMinValue = 'Min';
	$scope.clickOnDrawCanvas = false;
	$scope.infoMessage = null;
*/
	var matrixValuesOnly = JsonService.getMatrixValuesOnly();
	
	$scope.headers = JsonService.getHeaders();
	$scope.zoomValue = 1;

	$scope.setCanvasId = setCanvasId;
	$scope.setDivId = setDivId;
	$scope.setParagraphId = setParagraphId;
	$scope.drawCanvas = drawCanvas;

	$scope.$watch('zoomValue', function() {
        drawCanvas();
    });

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
		var pageLoad = document.getElementById('canvas0');
		if(pageLoad){
			CanvasService.setZoomValue($scope.zoomValue);
			var index = 0;
			_.each(matrixValuesOnly, function(current){
				CanvasService.getCoordinates(index, matrixValuesOnly[index], 'create', null);
				index++;
			});
		}
	}


	
	/*
	*  Private Variables
	
	var canvasMatrix = $scope.canvasMatrixFromInput;
	var INFO = 'Click on the canvas to sort it.';
	var canClick = false;
	var valuesOnly = JsonService.getValuesOnly();

	
	
	$scope.drawCanvas = drawCanvas;
	$scope.sortCanvas = sortCanvas;
	
	$scope.zoomValue = 1;

	 Public Methods - Implementation
	
	

	$scope.$watch('zoomValue', function() {
        drawCanvas();
    });

	function drawCanvas(){
		JsonService.getValuesOnly();
		CanvasService.setZoomValue($scope.zoomValue);
		var index = 0;
		var pageLoad = document.getElementById('canvas0');
		if(pageLoad){
			_.each(canvasMatrix, function(current){
				var canvas = document.getElementById('canvas' + index);
				getCoordinates(index, canvasMatrix[index], 'create', null);
				index++;
			});

			$scope.clickOnDrawCanvas = true;
			$scope.infoMessage = INFO;
			canClick = true;
		}
	}

	function sortCanvas(index){
		if(index >= 0 && canClick){
			var canvas = document.getElementById('canvas'+index);
			if(canvas){
            	createScale(index);

            	var unzipedCanvas = _.unzip(valuesOnly);
				unzipedCanvas.sort(function(a, b) {
				    if (a[index] === b[index]) {
				        return 0;
				    }else {
				        return (a[index] < b[index]) ? -1 : 1;
				    }
				});

				unzipedCanvas = _.unzip(unzipedCanvas);
				var finalCanvasMarix = [];

				var i = 0;
				for(i = 0; i<unzipedCanvas.length; i++){
					finalCanvasMarix[i] = _.filter(unzipedCanvas[i], function(element){
						return element !== undefined;
					})
				}

				var index = 0;
				_.each(finalCanvasMarix, function(canvasList){
					var canvas = document.getElementById('canvas'+index);
					var context = canvas.getContext("2d");
					context.clearRect(0, 0, canvas.width, canvas.height);
					getCoordinates(index, finalCanvasMarix[index], 'update', context);
					index++;
				});
			}
		}
	}

	

	
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

		$scope.canvasScaleMaxValue = canvasMaxMinMap.max;
		$scope.canvasScaleMinValue = canvasMaxMinMap.min;

		var finalGradient = context.createLinearGradient(0, 0, 0, 255);

		finalGradient.addColorStop(0, 'rgb(' + maxValue + ',' + minValue + ','+ maxValue + ')');
		finalGradient.addColorStop(1, 'rgb(' + maxValue + ',' + minValue + ','+ minValue + ')');

		context.fillStyle = finalGradient;
		context.fillRect(0, 0, 50, 500);
	}
	*/
});