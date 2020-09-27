/* global licenca, ContentType, DataType, Storage */

var HttpRequest = HttpRequest || {};

HttpRequest.Request = (function() {
    
    function Request() {
        this.responseAjax;
    }
    
    Request.prototype.post = function (object, url) {
        this.responseAjax = $.ajax({method: "POST",url: url,data: JSON.stringify(object),contentType: "application/json",dataType: "json"});
        setObject("status",this.responseAjax.status);
        setObject("object",this.responseAjax.responseJSON);
    };
    
    Storage.prototype.setObject = function (key, value) {
        this.setItem(key, JSON.stringify(value));
    };

    Storage.prototype.getObject = function (key) {
        var value = this.getItem(key);
        return value && JSON.parse(value);
    };

    return Request;
    
}());

//$(document).ajaxComplete(function (event, jqxhr, settings) {
//    console.log("ajaxComplete",settings.url);
//    console.log("ajaxComplete",jqxhr);
//    console.log("ajaxComplete",event);
//});

//$(document).ajaxSuccess(function (event, xhr, settings) {
//    console.log("ajaxSuccess",settings.url);
//    console.log("ajaxSuccess",xhr);
//    console.log("ajaxSuccess",event);
//});

//$(document).ajaxSend(function (event, jqxhr, settings) {
//    console.log("ajaxSend",settings.url);
//    console.log("ajaxSend",jqxhr);
//    console.log("ajaxSend",event);
//});
//
//$(document).ajaxError(function (event, jqxhr, settings, thrownError) {
//    console.log("ajaxError",settings.url);
//    console.log("ajaxError",jqxhr);
//    console.log("ajaxError",event);
//    console.log("ajaxError",thrownError);
//});