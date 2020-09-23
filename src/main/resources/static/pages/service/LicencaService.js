var LicencaService = LicencaService || {};

LicencaService.SalvarLicenca = (function() {

    function SalvarLicenca() {
        this.response;
    }
    SalvarLicenca.prototype.init = function (object) {
        var ajaxpost = new HttpRequest.Request();
        ajaxpost.post(object,"licencas/salvar");
        this.response = ajaxpost.reponse;
    };
    return SalvarLicenca;

}());