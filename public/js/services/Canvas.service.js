angular.module('CanvasService', [])
    .service('CanvasService', function () {
        var CANVAS_SIZE = 150;
        var canvasMaxMinMap = [];

        var self = this;

        self.calculateElementColor = calculateElementColor;
        self.plotPixel = plotPixel;
        self.getCoordinates = getCoordinates;
        self.getMaxValue = getMaxValue;
        self.getMinValue = getMinValue;
        self.getStringNumber = getStringNumber;
        self.filterList = filterList;
        self.getCanvasMaxMinMap = getCanvasMaxMinMap;

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
            var stringLength = stringToBeConverted.length;
            var stringSum = 0;

            for (i = 0; i < stringLength; i++) {
                stringSum += stringToBeConverted.charCodeAt(i);
            }

            return _.toInteger(stringSum/stringLength);
        }

        function calculateElementColor(current, listIndex){
            var maxNumber = canvasMaxMinMap[listIndex].max;
            var minNumber = canvasMaxMinMap[listIndex].min;
            var color = 0;

            if(maxNumber != minNumber){
                if(!_.isNumber(maxNumber)){
                maxNumber = self.getStringNumber(maxNumber);
                }
                if(!_.isNumber(minNumber)){
                    minNumber = self.getStringNumber(minNumber);
                }
                if(!_.isNumber(current)){
                    current = self.getStringNumber(current);
                }

                color = _.round(150 * (current - minNumber)/(maxNumber - minNumber));    
            }
            
            return color;
        }

        function plotPixel(context, x, y, color){
            context.fillStyle = "rgb(" + 1 + "," + 1 + "," + color + ")";
            context.fillRect(x, y, 1, 1);
        }

        function getCoordinates(listIndex, canvasList, type, context){
                if(type === 'create'){
                    var canvas = document.getElementById('canvas' + listIndex);
                    canvas.width = CANVAS_SIZE*2;
                    canvas.height = CANVAS_SIZE*2;
                    context = canvas.getContext('2d');
                }

                var filteredList = self.filterList(canvasList);
                var maxValue = self.getMaxValue(filteredList);
                var minValue = self.getMinValue(filteredList);

                canvasMaxMinMap[listIndex] = {max: maxValue, min: minValue};

                var x = CANVAS_SIZE;
                var y = CANVAS_SIZE;

                var addX = true;
                var addY = false;

                var internalCont = 1;
                var iteration = 0;

                _.each(filteredList, function(current){
                        if(iteration !== 0){
                            if(iteration % 2 !== 0){
                                if(addX){
                                    if(internalCont == 1 && iteration != 1){
                                        x = y + 1;
                                        internalCont++;
                                    }else if(internalCont < iteration){
                                        x = x + 1;
                                        internalCont++;
                                    }else if(internalCont === iteration){
                                        x = x +1;
                                        internalCont = 1;
                                        addX = false;
                                        addY = true;
                                    }
                                }else{
                                    if(internalCont < iteration){
                                        y = y + 1;
                                        internalCont++;
                                    }else if(internalCont === iteration){
                                        y = y + 1;
                                        internalCont = 1;
                                        addX = true;
                                        addY = false;
                                    }
                                }
                            }else{
                                if(addX){
                                    if(internalCont == 1 && iteration != 1){
                                        x = y - 1;
                                        internalCont++;
                                    }else if(internalCont < iteration){
                                        x = x - 1;
                                        internalCont++;
                                    }else if(internalCont === iteration){
                                        x = x - 1;
                                        internalCont = 1;
                                        addX = false;
                                        addY = true;
                                    }
                                }else{
                                    if(internalCont < iteration){
                                        y = y - 1;
                                        internalCont++;
                                    }else if(internalCont === iteration){
                                        y = y - 1;
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
                        console.log('service-----------> element: ' + current + ' color: ' + color);
                        self.plotPixel(context, x, y, color);
                });
            }

        return {
            calculateElementColor: self.calculateElementColor,
            plotPixel: self.plotPixel,
            getCoordinates: self.getCoordinates,
            getMaxValue: self.getMaxValue,
            getMinValue: self.getMinValue,
            filterList: self.filterList,
            getCanvasMaxMinMap: self.getCanvasMaxMinMap
        };
});