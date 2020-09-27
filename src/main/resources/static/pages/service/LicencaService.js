/* global HttpRequest */

var LicencaService = LicencaService || {};

LicencaService.SalvarLicenca = (function() {

    function SalvarLicenca() {
        this.response;
    }
    
    SalvarLicenca.prototype.init = function (object) {
        var request = new HttpRequest.Request();
        request.post(object,"licencas/salvar");
        this.response = request;
    };
    
    return SalvarLicenca;

}());