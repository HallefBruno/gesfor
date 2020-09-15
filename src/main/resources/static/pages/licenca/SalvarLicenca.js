$(function () {
    
    validarComposDeEntrada();
    
    $("#btnSalvarLicenca").click(function () {

        $("#msgError").html("");

        var licenca = {'cnpj': $("#cnpj").val(), 'dataCadastro': new Date(), 'email': $("#email").val(), 'status': true, 'telefone': $("#telefone").val()};

        $.ajax({

            method: "POST",
            url: "licencas/salvar",
            data: JSON.stringify(licenca),
            contentType: "application/json",
            dataType: "json",

            success: function (data, textStatus, jqXHR) {
                //alert("Registro salvo com sucesso");
                swal("Here's a message!");
            },

            error: function (xhr, status, error) {
                //console.log(validarComposDeEntrada);
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