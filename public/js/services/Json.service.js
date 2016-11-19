angular.module('JsonService', [])
    .service('JsonService', function (JsonAdapter) {
        self = this;
        var matrixValuesOnly = [];
        var headers = [];

        self.setJson = setJson;

        function setJson(jsonFromInput){
            matrixValuesOnly = JsonAdapter.convertJsonObjectToValuesMatrix(jsonFromInput);
            headers = JsonAdapter.getHeaders();
            console.log(headers);
            console.log(matrixValuesOnly);
        }
        
        return {
           setJson: self.setJson
        };
    });