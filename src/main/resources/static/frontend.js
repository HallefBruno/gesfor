$(function () {
    adicionarPaginaHTML();
    gifLoading();
    getMessageErroAttribute();
});

function adicionarPaginaHTML() {
    
    $('#linkBairro').click(function () {
        $("#pages").find("div").empty();
        $("#pages").find("div").load("pages/bairro/Bairro.html");
    });
    $('#linkCidade').click(function () {
        $("#pages").find("div").empty();
        $("#pages").find("div").load("pages/licenca/Licenca.html");
    });
}

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
    validarViaBtn();
}

function validarViaBtn() {
    var qualquerBtn = document.getElementsByClassName('btn_');
    var inputs = document.getElementsByClassName('validar');
    Array.prototype.filter.call(qualquerBtn, function (btn) {
        btn.addEventListener('click', function (event) {
            Array.prototype.filter.call(inputs, function (input) {
                input.classList.remove('is-invalid');
                input.classList.remove('is-valid');

                if (input.checkValidity() === false) {
                    input.classList.add('is-invalid');
                } else {
                    input.classList.add('is-valid');
                }
            });
        }, false);
    });
}

function getMessageErroAttribute() {
    $(document).ajaxError(function (event, jqxhr, settings) {
        const messageAtribbuteError = jqxhr.responseJSON;
    });
}