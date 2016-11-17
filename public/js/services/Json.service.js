angular.module('JsonService', [])
    .service('JsonService', function () {
        var json;
        var numericList;
        var errorMessage = null;
        var WRONG_FORMAT = 1;
        var EMPTY_JSON = 2;
        var isError = false;

        return {
            getJson: function () {
                return json;
            },

            setJson: function(value) {
                try{
                    json = JSON.parse(value);
                    if(_.isEmpty(json)){
                        throw EMPTY_JSON;
                    }
                    _.each(json, function(lista){
                        if(typeof(lista[0]) !== 'string' || lista.length < 2){
                            throw  WRONG_FORMAT;
                            return;
                        }
                    });

                    isError = false;
                }
                catch(e){
                    isError = true;
                    if(e === WRONG_FORMAT){
                        throw 'The Json is not in the expected format';
                    }
                    else{
                        throw 'Error parsing the json.';     
                    }
                   
                }
            },

            setNumericList: function(list){
                numericList = list;
            },

            getNumericList: function(){
                return numericList;
            },

            getValuesOnly: function(){
                var headers = [];
                if(json){
                    var linha = 0;
                    _.each(json, function(line){
                    if(json[linha][0] === line[0]){
                        headers[linha] = line[0];
                        linha++;
                        return;
                    }

                });

                var matrizValuesOnly = [];
                var i = 0;
                var j = 0;
                _.each(json, function(line){ 
                    j = 0;
                    matrizValuesOnly[i] = [];
                    _.each(line, function(elememnt){
                        var isHeader = _.some(headers, function(header){
                            return elememnt === header;
                        });

                        if(!isHeader){
                            matrizValuesOnly[i][j] = elememnt;
                            j++;
                        }
                    });
                    i++;
                });

                return matrizValuesOnly;
                }
                
            }
        };
    });