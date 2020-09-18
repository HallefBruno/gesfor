/* global Swal */

$(function () {
    adicionarPaginaHTML();
    gifLoading();
    getMessageErroAttribute();
});

function adicionarPaginaHTML() {

    $("#linkBairro").click(function () {
        $("#pages").find("div").empty();
        $("#pages").find("div").load("pages/bairro/Bairro.html");
    });
    $("#linkCidade").click(function () {
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
    var inputs = document.getElementsByClassName("validar");
    Array.prototype.filter.call(inputs, function (input) {
        input.addEventListener("blur", function (event) {
            input.classList.remove("is-invalid");
            input.classList.remove("is-valid");

            if (input.checkValidity() === false) {
                input.classList.add("is-invalid");
            } else {
                input.classList.add("is-valid");
            }

        }, false);
    });
    validarViaBtn();
}

function validarViaBtn() {
    var qualquerBtn = document.getElementsByClassName("btn_");
    var inputs = document.getElementsByClassName("validar");
    Array.prototype.filter.call(qualquerBtn, function (btn) {
        btn.addEventListener("click", function (event) {
            Array.prototype.filter.call(inputs, function (input) {
                input.classList.remove("is-invalid");
                input.classList.remove("is-valid");

                if (input.checkValidity() === false) {
                    input.classList.add("is-invalid");
                } else {
                    input.classList.add("is-valid");
                }
            });
        }, false);
    });
}

function getMessageErroAttribute() {
    $(document).ajaxError(function (event, jqxhr, settings) {

        let jsonErro = jqxhr.responseJSON;
        
        if (jsonErro.messageDev !== undefined && jsonErro.messageDev !== null) {
            console.warn(jsonErro);
            let messageUser = jqxhr.responseJSON.messageUser;
            toastSimples(messageUser,"warning");
        }
        
        let messageAtribbuteError = jqxhr.responseJSON;
        
        if (messageAtribbuteError) {
            let classe = "";
            $.each(messageAtribbuteError, function (key, value) {
                classe = "." + key + "_feedback";
                $(classe).text(value);
            });
        }
    });
}

function toastSimples(message,icon) {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        onOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
        }
    });

    Toast.fire({
        icon: `${icon}`,
        title: `${message}`
    });
}

function removerMaskara(campo) {
    return campo.replace(/[^0-9]+/g, '');
}
