/* global FormUtil, LicencaService */

$(document).ready(function() {
    
    let dataF = new FormUtil.ValidaForm();
    
    $("#btnSalvarLicenca").click(function () {
        
        $("#status").val(true);
        $("#dataCadastro").val(Date.now());
        
        let options = {
            removerMask: {
                'cnpj':true,
                'telefone':true
            }
        };
        
        dataF.init("form_licenca",options);
        let data = dataF.data;

        var http = new LicencaService.SalvarLicenca();
        http.init(data);
        console.log(http.response.getObject("object"));
    });
    
});