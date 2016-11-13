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
                        if(typeof(lista[0]) !== 'string'){
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
            }
        };
    });