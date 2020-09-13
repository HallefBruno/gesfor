$(function () {
    
    $("#btnSalvarLicenca").click(function () {
        
        var licenca = {cnpj:'1234567891234567'};
        
        $.ajax({
            
            method: "POST",
            url: "licencas/salvar",
            data: JSON.stringify(licenca),
            contentType: "application/json",
            dataType: "json"
            
        });
        
    });
    
});