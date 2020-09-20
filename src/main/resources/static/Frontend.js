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
    $("#linkCartaoAcesso").click(function () {
        $("#pages").find("div").empty();
        $("#pages").find("div").load("pages/acesso/Acesso.html");
    });
    $("#linkPortaria").click(function () {
        $("#pages").find("div").empty();
        $("#pages").find("div").load("pages/portaria/Portaria.html");
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
            if(messageUser!== undefined && messageUser !== null) {
                toastSimples(messageUser,"warning");
            }
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




/*!
 * Start Bootstrap - SB Admin 2 v4.0.7 (https://startbootstrap.com/template-overviews/sb-admin-2)
 * Copyright 2013-2019 Start Bootstrap
 * Licensed under MIT (https://github.com/BlackrockDigital/startbootstrap-sb-admin-2/blob/master/LICENSE)
 */

!function(t){"use strict";t("#sidebarToggle, #sidebarToggleTop").on("click",function(o){t("body").toggleClass("sidebar-toggled"),t(".sidebar").toggleClass("toggled"),t(".sidebar").hasClass("toggled")&&t(".sidebar .collapse").collapse("hide")}),t(window).resize(function(){t(window).width()<768&&t(".sidebar .collapse").collapse("hide")}),t("body.fixed-nav .sidebar").on("mousewheel DOMMouseScroll wheel",function(o){if(768<t(window).width()){var e=o.originalEvent,l=e.wheelDelta||-e.detail;this.scrollTop+=30*(l<0?1:-1),o.preventDefault()}}),t(document).on("scroll",function(){100<t(this).scrollTop()?t(".scroll-to-top").fadeIn():t(".scroll-to-top").fadeOut()}),t(document).on("click","a.scroll-to-top",function(o){var e=t(this);t("html, body").stop().animate({scrollTop:t(e.attr("href")).offset().top},1e3,"easeInOutExpo"),o.preventDefault();});}(jQuery);
