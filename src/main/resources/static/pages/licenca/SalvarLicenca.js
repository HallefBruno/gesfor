$(function () {
    
    
    
    $("#btnSalvarLicenca").click(function () {
        
        $("#msgError").html("");
        
        var licenca = {cnpj: $("#cnpj").val()};
        
        $.ajax({
            
            method: "POST",
            url: "licencas/salvar",
            data: JSON.stringify(licenca),
            contentType: "application/json",
            dataType: "json",
            
            success: function (data, textStatus, jqXHR) {
                alert("Registro salvo com sucesso");
            },
            
            error: function (xhr, status, error) {
                console.log(xhr.responseText);
                $("#msgError").html(xhr.responseText);
            }
            
        });
        
    });
    
});