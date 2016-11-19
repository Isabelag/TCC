angular.module('CanvasService', [])
    .service('CanvasService', function () {
        var CANVAS_SIZE = 150;
        var canvasMaxMinMap = [];
        var zoomValue = 1;
        var self = this;

        self.calculateElementColor = calculateElementColor;
        self.plotPixel = plotPixel;
        self.getCoordinates = getCoordinates;
        self.getMaxValue = getMaxValue;
        self.getMinValue = getMinValue;
        self.getStringNumber = getStringNumber;
        self.filterList = filterList;
        self.getCanvasMaxMinMap = getCanvasMaxMinMap;
        self.setZoomValue = setZoomValue;

        function setZoomValue(value){
            zoomValue = value;
        }

        function getCanvasMaxMinMap(listIndex){
            return canvasMaxMinMap[listIndex];
        }

        function filterList(listToBeFiltered){
            var filteredList = [];
                var i = 1;
                var j = 0;
                for(i = 1, j = 0; i<listToBeFiltered.length; i++, j++){
                    filteredList[j] = listToBeFiltered[i];
                }
            return filteredList;
        }

        function getMaxValue(filteredList){
            return _.max(filteredList);
        }

        function getMinValue(filteredList){
            return _.min(filteredList);
        }

        function getStringNumber(stringToBeConverted){
            var i = 0;
            var stringSum = 0;

            for (i = 0; i < stringToBeConverted.length; i++) {
                stringSum += stringToBeConverted.charCodeAt(i);
            }

            return stringSum;
        }

        function calculateElementColor(current, listIndex){
            var maxNumber = canvasMaxMinMap[listIndex].max;
            
            if(!_.isNumber(maxNumber)){
                maxNumber = self.getStringNumber(maxNumber);
            }
            if(!_.isNumber(current)){
                current = self.getStringNumber(current);
            }
                
            return ((current * 100)/maxNumber);
        }

        function plotPixel(context, x, y, color, listIndex){
            context.fillStyle = "hsl(237,100%," + color + "%)";
            context.fillRect(x, y, zoomValue, zoomValue);
        }

        function getCoordinates(listIndex, filteredList, type, context){
                var maxValue = _.max(filteredList);
                var minValue = _.min(filteredList);

                var x = CANVAS_SIZE;
                var y = CANVAS_SIZE;

                var addX = true;
                var addY = false;
                var internalCont = 1;
                var iteration = 0;

                if(type === 'create'){
                    var canvas = document.getElementById('canvas' + listIndex);
                    canvas.width = CANVAS_SIZE*2;
                    canvas.height = CANVAS_SIZE*2;
                    context = canvas.getContext('2d');
                    canvasMaxMinMap[listIndex] = {max: maxValue, min: minValue};
                }

                _.each(filteredList, function(current){
                        if(iteration !== 0){
                            if(iteration % 2 !== 0){
                                if(addX){
                                    if(internalCont == 1 && iteration != 1){
                                        x = y + zoomValue;
                                        internalCont++;
                                    }else if(internalCont < iteration){
                                        x = x + zoomValue;
                                        internalCont++;
                                    }else if(internalCont === iteration){
                                        x = x + zoomValue;
                                        internalCont = 1;
                                        addX = false;
                                        addY = true;
                                    }
                                }else{
                                    if(internalCont < iteration){
                                        y = y + zoomValue;
                                        internalCont++;
                                    }else if(internalCont === iteration){
                                        y = y + zoomValue;
                                        internalCont = 1;
                                        addX = true;
                                        addY = false;
                                    }
                                }
                            }else{
                                if(addX){
                                    if(internalCont == 1 && iteration != 1){
                                        x = y - zoomValue;
                                        internalCont++;
                                    }else if(internalCont < iteration){
                                        x = x - zoomValue;
                                        internalCont++;
                                    }else if(internalCont === iteration){
                                        x = x - zoomValue;
                                        internalCont = 1;
                                        addX = false;
                                        addY = true;
                                    }
                                }else{
                                    if(internalCont < iteration){
                                        y = y - zoomValue;
                                        internalCont++;
                                    }else if(internalCont === iteration){
                                        y = y - zoomValue;
                                        internalCont = 1;
                                        addX = true;
                                        addY = false;
                                    }
                                }   
                            }
                            if(x===y){
                                iteration++;
                            }
                        }else{
                            iteration++;
                        }

                        var color = self.calculateElementColor(current, listIndex);
                        self.plotPixel(context, x, y, color, listIndex);
                });
            }

        return {
            calculateElementColor: self.calculateElementColor,
            plotPixel: self.plotPixel,
            getCoordinates: self.getCoordinates,
            getMaxValue: self.getMaxValue,
            getMinValue: self.getMinValue,
            filterList: self.filterList,
            getCanvasMaxMinMap: self.getCanvasMaxMinMap,
            setZoomValue: self.setZoomValue,
            getStringNumber: self.getStringNumber
        };
});