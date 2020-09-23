$(function () {
    
    var dataF = new DataForm.ValidaForm();
    dataF.init("form_licenca");
    
    validarComposDeEntrada();
    maskCnpjCpfPhone();

    $("#btnSalvarLicenca").click(function () {

        //console.log($("form").serializeArray());
        

        let licenca = {
            'cnpj': removerMaskara($("#cnpj").val()),
            'dataCadastro': new Date(),
            'email': $("#email").val(),
            'status': true,
            'senha': $("#senha").val(),
            'telefone': removerMaskara($("#telefone").val()),
            'qtdUsuarios': $("#qtdUsuarios").val()
        };

        var http = new LicencaService.SalvarLicenca();
        http.init(licenca);
        console.log(http);

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

//    $('.js-example').select2({
//        theme: 'bootstrap4'
//    });