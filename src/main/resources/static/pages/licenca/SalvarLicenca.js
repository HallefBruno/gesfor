/* global Swal */

$(function () {

    validarComposDeEntrada();
    maskCnpjCpfPhone();

//    $('.js-example').select2({
//        theme: 'bootstrap4'
//    });


    $("#btnSalvarLicenca").click(function () {

        let telefone = removerMaskara($("#telefone").val());
        let cnpj = removerMaskara($("#cnpj").val());

        let licenca = {
            'cnpj': cnpj, 
            'dataCadastro': new Date(), 
            'email': $("#email").val(), 
            'status': true, 
            'senha':$("#senha").val(),
            'telefone': telefone,
            'qtdUsuarios':$("#qtdUsuarios").val()
        };

        $.ajax({

            method: "POST",
            url: "licencas/salvar",
            data: JSON.stringify(licenca),
            contentType: "application/json",
            dataType: "json",

            success: function (data, textStatus, jqXHR) {
                toastSimples('Registro salvo com sucesso!', 'success');
            }

        });

    });


});

function latLong() {

    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };

    navigator.geolocation.getCurrentPosition(success, error, options);
}

function success(pos) {
    var crd = pos.coords;
    console.log(crd);
    console.log('Sua posição atual é:');
    console.log('Latitude : ' + crd.latitude);
    console.log('Longitude: ' + crd.longitude);
    console.log('Mais ou menos ' + crd.accuracy + ' metros.');
}

function error(err) {
    console.warn('ERROR(' + err.code + '): ' + err.message);
}