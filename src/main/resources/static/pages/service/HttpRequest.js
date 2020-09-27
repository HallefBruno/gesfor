/* global licenca, ContentType, DataType, Storage */

var HttpRequest = HttpRequest || {};

HttpRequest.Request = (function () {

    function Request() {
        this.responseAjax;
    }

    Request.prototype.post = function (object, url) {
        this.responseAjax = $.ajax({method: "POST", url: url, data: JSON.stringify(object), contentType: "application/json", dataType: "json"});
        setObject("status", this.responseAjax.status);
        setObject("object", this.responseAjax.responseJSON);
    };
    
    return Request;

}());

Storage.prototype.setObject = function (key, value) {
    this.setItem(key, JSON.stringify(value));
};

Storage.prototype.getObject = function (key) {
    var value = this.getItem(key);
    return value && JSON.parse(value);
};