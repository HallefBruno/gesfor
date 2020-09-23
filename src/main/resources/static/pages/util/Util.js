var DataForm = DataForm || {};

DataForm.ValidaForm = (function () {

    function ValidaForm() {
        this.data;
    }

    ValidaForm.prototype.init = function (form) {
        $(form).submit(function (event) { event.preventDefault();});
        let formString = "[name='" + form + "']";
        let atributosComNome = [];
        let atributosSemNome = [];
        $(formString).find("input").each(function () {
            if (!$(this).prop("name")) {
                console.warn($(this));
                console.warn($(this)[0].id);
                $(this).prop("disabled",true);
                atributosSemNome.push({'semNome':$(this)[0].id});
            } else {
                atributosComNome.push({'nome':$(this).prop("name")});
            }
        });
        
        if(atributosSemNome.length > 0) {
            throw new Error("Formulário com atributo inválido");
        }
    };

    return ValidaForm;

}());