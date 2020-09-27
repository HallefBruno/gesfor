/* global Swal, LicencaHttp, licenca */

$(function () {
    adicionarPaginaHTML();
});

function adicionarPaginaHTML() {
    cadastros();
}

const LINK_PAGE_CADASTRO = {

    CADASTRO_LICENCA: "pages/licenca/Licenca.html",
    CADASTRO_BAIRRO: "pages/bairro/Bairro.html",
    CADASTRO_ACESSO: "pages/acesso/Acesso.html",
    CADASTRO_PORTARIA: "pages/portaria/Portaria.html"

};

function cadastros() {
    let stringHtmlLink = "";
    let linkTagert="";
    let paginas = new Array();
    paginas.push({id: 1, name: 'Cadastro Licença', pagina: LINK_PAGE_CADASTRO.CADASTRO_LICENCA, idLink: 'linkLicenca'});
    paginas.push({id: 2, name: 'Cadastro Portaria', pagina: LINK_PAGE_CADASTRO.CADASTRO_PORTARIA, idLink: 'linkPortaria'});
    paginas.push({id: 3, name: 'Cadastro Acesso', pagina: LINK_PAGE_CADASTRO.CADASTRO_ACESSO, idLink: 'linkAcesso'});

    $.each(paginas, function (i) {
        
        stringHtmlLink+="<a class='collapse-item " + paginas[i].idLink + "' href='#'> " + paginas[i].name + " </a>"; //<div class='collapse-divider'></div>

        $("#linkPaginas").on("click", "a." + paginas[i].idLink, function (target) {
            if ($("#pages").find("div").length <= 1 || linkTagert !== target.handleObj.selector) {
                $("#pages").find("div").empty();
                console.log("Iniciando");
                $("#pages").find("div").load(paginas[i].pagina, function () {
                    console.log("Completo");
                });
                linkTagert = target.handleObj.selector;
            }
        });
    });

    $("#linkPaginas").html(stringHtmlLink);

}
