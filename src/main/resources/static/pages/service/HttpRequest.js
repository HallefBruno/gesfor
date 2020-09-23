/* global licenca, ContentType, DataType */

var HttpRequest = HttpRequest || {};

HttpRequest.Request = (function() {
    
    function Request() {
        this.reponse;
    }
    
    Request.prototype.post = function (object, url) {
        this.reponse = $.ajax({method: "POST",url: url,data: JSON.stringify(object),contentType: "application/json",dataType: "json"});
    };
    
    return Request;
    
}());