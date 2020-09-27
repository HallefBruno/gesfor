/* global Swal */

var FormUtil = FormUtil || {};

FormUtil.ValidaForm = (function () {

    function ValidaForm() {
        this.data;
    }

    ValidaForm.prototype.init = function (form, options) {
        $(form).submit(function (event) {event.preventDefault();});
        validForm(form);
        this.data = dataJson(form, options);
    };

    function validForm(form) {
        let formString = "[name='" + form + "']";
        let atributosComNome = [];
        let atributosSemNome = [];
        $(formString).find("input").each(function () {
            if (!$(this).prop("name")) {
                console.warn($(this));
                console.warn($(this)[0].id);
                $(this).prop("disabled", true);
                atributosSemNome.push({'semNome': $(this)[0].id});
            } else {
                atributosComNome.push({'nome': $(this).prop("name")});
            }
        });

        if (atributosSemNome.length > 0) {
            throw new Error("Formulário inválido, falta incluir atributo nome!");
        }
    }

    const dataJson = function (form, options) {

        let objForm = $("[name='" + form + "']");
        let attributes;
        let valuesOriginal = {};

        if (options) {
            if (options.removerMask) {
                attributes = options.removerMask;
                for (var obj in attributes) {
                    let attr = obj;
                    let value = attributes[obj];
                    $(objForm[0]).find("input").each(function () {
                        if ($(this).prop("name") === attr && value) {
                            valuesOriginal[[attr]] = $(this).val();
                            $(this).val($(this).val().replace(/[^0-9]+/g, ''));
                        }
                    });
                }
            }
        }

        let array = objForm.serializeArray();
        let data = {};
        for (var i = 0; i < array.length; i++) {
            data[array[i].name] = array[i].value;
        }

        $.each(valuesOriginal, function (attr, value) {
            $(objForm[0]).find("input").each(function () {
                if ($(this).prop("name") === attr) {
                    $(this).val(value);
                }
            });
        });

        return data;
    };

    return ValidaForm;

}());

FormUtil.GifLoad = (function () {

    function GifLoad() {}

    GifLoad.prototype.init = function () {
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
    };

    return GifLoad;

}());


FormUtil.MaskGesfor = (function () {

    function MaskGesfor() {}

    MaskGesfor.prototype.init = function () {

        let cnpj = $("#cnpj");
        let telefone = $("#telefone");

        cnpj.mask('00.000.000/0000-00', {reverse: true});

        var phoneMask = function (val) {
            return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
        },
        phoneOptions = {
            onKeyPress: function (val, e, field, options) {
                field.mask(phoneMask.apply({}, arguments), options);
            }
        };
        telefone.mask(phoneMask, phoneOptions);
    };
    
    return MaskGesfor;

}());

FormUtil.MessageErroAttribute = (function () {
    
    function MessageErroAttribute() {}
    
    MessageErroAttribute.prototype.init = function () {
        $(document).ajaxError(function (event, jqxhr, settings) {

            let jsonErro = jqxhr.responseJSON;

            if (jsonErro.messageDev !== 'undefined' && jsonErro.messageDev !== null) {
                console.warn(jsonErro);
                let messageUser = jqxhr.responseJSON.messageUser;
                if (messageUser !== undefined && messageUser !== null) {
                    toastSimples(messageUser, "warning");
                }
            }

            let messageAtribbuteError = jsonErro;

            if (messageAtribbuteError) {
                let classe = "";
                $.each(messageAtribbuteError, function (key, value) {
                    classe = "." + key + "_feedback";
                    $(classe).text(value);
                });
            }
        });
    };
    
    return MessageErroAttribute;

}());

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

function toastSimples(message,icon) {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 6000,
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

$(function () {
    var gifLoad = new FormUtil.GifLoad();
    gifLoad.init();
    
    var maskGesfor = new FormUtil.MaskGesfor();
    maskGesfor.init();
    
    var messageErroAttribute = new FormUtil.MessageErroAttribute();
    messageErroAttribute.init();
    
    validarComposDeEntrada();
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
