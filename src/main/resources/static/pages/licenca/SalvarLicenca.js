$(function () {

    validarComposDeEntrada();

    
});
//
////$(function () {
//    
//    
//    
//    $("#btnSalvarLicenca").click(function () {
//        
//        $("#msgError").html("");
//        
//        var licenca = {cnpj: $("#cnpj").val()};
//        
//        $.ajax({
//            
//            method: "POST",
//            url: "licencas/salvar",
//            data: JSON.stringify(licenca),
//            contentType: "application/json",
//            dataType: "json",
//            
//            success: function (data, textStatus, jqXHR) {
//                alert("Registro salvo com sucesso");
//            },
//            
//            error: function (xhr, status, error) {
//                console.log(xhr.responseText);
//                $("#msgError").html(xhr.responseText);
//            }
//            
//        });
//        
//    });
//    
//})

//(function () {
//   'use strict';
//    var inputs = document.getElementsByClassName('validar');
//    Array.prototype.filter.call(inputs, function (input) {
//        
//        input.addEventListener('blur', function (event) {
//            
//            input.classList.remove('is-invalid');
//            input.classList.remove('is-valid');
//            
//            if (input.checkValidity() === false) {
//                input.classList.add('is-invalid');
//            } else {
//                input.classList.add('is-valid');
//            }
//            
//        }, false);
//    });
//    
//})();