angular.module('CanvasCtrl', []).controller('CanvasController', function($scope, JsonService, CanvasService) {
	var matrixValuesOnly = JsonService.getMatrixValuesOnly();
	
	$scope.canClick = false;
	$scope.infoMessage = 'Click in a canvas to sort.'
	$scope.canvasScaleMaxValue = 'Max';
	$scope.canvasScaleMinValue = 'Min';
	$scope.headers = JsonService.getHeaders();
	$scope.zoomValue = 1;

	$scope.setCanvasId = setCanvasId;
	$scope.setDivId = setDivId;
	$scope.setParagraphId = setParagraphId;
	$scope.drawCanvas = drawCanvas;
	$scope.sortCanvas = sortCanvas;
	
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

			$scope.canClick = true;
		}
	}

	function sortCanvas(index){
		if(index >= 0 && $scope.canClick){
			var canvas = document.getElementById('canvas'+index);
			if(canvas){
				var finalCanvasMarix = CanvasService.sortCanvas(matrixValuesOnly, index);
				var listIndex = 0;
				_.each(finalCanvasMarix, function(){
					var canvas = document.getElementById('canvas'+listIndex);
					var context = canvas.getContext("2d");
					context.clearRect(0, 0, canvas.width, canvas.height);
					CanvasService.getCoordinates(listIndex, finalCanvasMarix[listIndex], 'update', context);
					listIndex++;
				});

				createScale(index);
			}
		}
	}

	function createScale(index){
		var maxValue = 0;
		var minValue = 0;

		var canvasGradient = document.getElementById("canvasScale");
		var context = canvasGradient.getContext('2d');

		var canvasMaxMinMap = CanvasService.getCanvasMaxMinMap(index);

		maxValue = CanvasService.calculateElementColor(canvasMaxMinMap.max, index);
		minValue = CanvasService.calculateElementColor(canvasMaxMinMap.min, index);

		$scope.canvasScaleMaxValue = canvasMaxMinMap.max;
		$scope.canvasScaleMinValue = canvasMaxMinMap.min;

		var finalGradient = context.createLinearGradient(0, 0, 0, 255);

		finalGradient.addColorStop(0, 'hsl(237,100%,' + maxValue + '%)');
		finalGradient.addColorStop(1, 'hsl(237,100%,' + minValue + '%)');

		context.fillStyle = finalGradient;
		context.fillRect(0, 0, 50, 500);
	}
});