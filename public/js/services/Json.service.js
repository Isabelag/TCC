angular.module('JsonService', [])
    .service('JsonService', function (JsonAdapter, $http) {
        self = this;

        var matrixValuesOnly = [];
        var headers = [];

        self.setJson = setJson;
        self.getMatrixValuesOnly = getMatrixValuesOnly;
        self.getHeaders = getHeaders;
        self.readFile = readFile;

        function readFile(fileNameFromInput){
            $http.get('/' + fileNameFromInput).success(function(data) {
                fileNameFromInput = data;
                matrixValuesOnly = JsonAdapter.convertJsonObjectToValuesMatrix(fileNameFromInput);
                headers = JsonAdapter.getHeaders();
            });
        }

        function setJson(jsonFromInput){
            try{
                jsonFromInput = JSON.parse(jsonFromInput);
                matrixValuesOnly = JsonAdapter.convertJsonObjectToValuesMatrix(jsonFromInput);
                headers = JsonAdapter.getHeaders();
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
            getHeaders: self.getHeaders,
            readFile: self.readFile
        };
    });