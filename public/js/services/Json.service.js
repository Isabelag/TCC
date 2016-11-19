angular.module('JsonService', [])
    .service('JsonService', function (JsonAdapter) {
        self = this;

        var matrixValuesOnly = [];
        var headers = [];

        self.setJson = setJson;
        self.getMatrixValuesOnly = getMatrixValuesOnly;
        self.getHeaders = getHeaders;

        function setJson(jsonFromInput){
            try{
                jsonFromInput = JSON.parse(jsonFromInput);
                matrixValuesOnly = JsonAdapter.convertJsonObjectToValuesMatrix(jsonFromInput);
                headers = JsonAdapter.getHeaders();
                console.log(headers);
                console.log(matrixValuesOnly);
            }catch(exception){
                throw exception;
            }
        }

        function getMatrixValuesOnly(){
            return matrixValuesOnly;
        }

        function getHeaders(){
            return headers;
        }
        
        return {
            setJson: self.setJson,
            getMatrixValuesOnly: self.getMatrixValuesOnly,
            getHeaders: self.getHeaders
        };
    });