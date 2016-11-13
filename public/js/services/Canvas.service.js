angular.module('CanvasService', [])
    .service('CanvasService', function () {
        var CANVAS_SIZE = 60;
        var self = this;

        self.calculateElementColor = calculateElementColor;
        self.plotPixel = plotPixel;
        self.getCoordinates = getCoordinates;
        self.getMaxValue = getMaxValue;
        self.getMinValue = getMinValue;

        function getMaxValue(numericList){
            return _.max(numericList);
        }

        function getMinValue(numericList){
            return _.min(numericList);
        }

        function calculateElementColor(current, canvasList){
            var maxNumber = _.max(canvasList);
            var minNumber = _.min(canvasList);
            return _.round(150 * (current - minNumber)/(maxNumber - minNumber));
        }

        function plotPixel(context, x, y, color){
            context.fillStyle = "rgb(" + 1 + "," + 1 + "," + color + ")";
            context.fillRect(x, y, 1, 1);
        }

        function getCoordinates(index, canvasList, type, context){
                var canvasListOnlyNumber = canvasList;

                var maxElement = _.max(canvasListOnlyNumber);
                var minElement = _.min(canvasListOnlyNumber);

                if(type === 'create'){
                    var canvas = document.getElementById('canvas' + index);
                    canvas.width = 120;
                    canvas.height = 120;
                    context = canvas.getContext('2d');
                }

                /*
                if(tipo === 'update'){
                    createEscala(maiorElemento, menorElemento);
                }
                */
                    
                var x = Math.round(CANVAS_SIZE);
                var y = Math.round(CANVAS_SIZE);

                var addX = true;
                var addY = false;

                var internalCont = 1;
                var iteration = 0;

                _.each(canvasListOnlyNumber, function(current){
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

                    var color = self.calculateElementColor(current, canvasListOnlyNumber);
                    self.plotPixel(context, x, y, color);
                });
            }

        return {
            calculateElementColor: self.calculateElementColor,
            plotPixel: self.plotPixel,
            getCoordinates: self.getCoordinates,
            getMaxValue: self.getMaxValue,
            getMinValue: self.getMinValue
        };
});