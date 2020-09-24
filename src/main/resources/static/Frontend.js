/* global Swal, LicencaHttp, licenca */

$(function () {
    adicionarPaginaHTML();
});

function adicionarPaginaHTML() {

    $("#linkBairro").click(function () {
        $("#pages").find("div").empty();
        $("#pages").find("div").load("pages/bairro/Bairro.html");
    });
    $("#linkLicenca").click(function () {
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
