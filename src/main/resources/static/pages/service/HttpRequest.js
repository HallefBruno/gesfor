/* global licenca, ContentType, DataType, Storage, LocalStorage */

var HttpRequest = HttpRequest || {};

HttpRequest.Request = (function () {

    function Request() {}

    Request.prototype.post = function (object, url) {
        let ajax = $.ajax({method: "POST", url: url, data: JSON.stringify(object), contentType: "application/json", dataType: "json"});
        new LocalStorage.setObject("status", ajax.status);
    };
    
    return Request;

}());

HttpRequest.LocalStorage = (function () {
    
    Storage.prototype.setObject = function (key, value) {
        this.setItem(key, JSON.stringify(value));
    };
    
    Storage.prototype.getObject = function (key) {
        var value = this.getItem(key);
        return value && JSON.parse(value);
    };
    
}());


