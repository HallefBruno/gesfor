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