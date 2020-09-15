$(document).ready(function () {
    
    
    $('#linkBairro').click(function () {
        $("#pages").find("div").empty();
        $("#pages").find("div").load("pages/bairro/Bairro.html");
    });
    
    
    $('#linkCidade').click(function () {
        $("#pages").find("div").empty();
        $("#pages").find("div").load("pages/licenca/Licenca.html");
    });
    
    
    gifLoading();
    
    validarComposDeEntrada();
    
});


function gifLoading() {
    
    $(document).ajaxSend(function (event, jqxhr, settings) {
        if ((!settings.url.includes("term")) && (!settings.processResults)) {
            $("#divLoading").addClass("show");
        }
    });
    
    $(document).ajaxComplete(function (event, jqxhr, settings) {
        if ((!settings.url.includes("term")) && (!settings.processResults)) {
            $("#divLoading").removeClass("show");
        }
    });
}

function validarComposDeEntrada() {
    var inputs = document.getElementsByClassName('validar');
    Array.prototype.filter.call(inputs, function (input) {
        
        input.addEventListener('blur', function (event) {
            
            input.classList.remove('is-invalid');
            input.classList.remove('is-valid');
            
            if (input.checkValidity() === false) {
                input.classList.add('is-invalid');
            } else {
                input.classList.add('is-valid');
            }
            
        }, false);
    });
}