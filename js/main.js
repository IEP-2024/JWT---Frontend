$(document).ready(function(){
    

    function checkAutenticacion(){
        if(! localStorage.getItem("token"))
            return false;
        return true;
    }

    function autenticar(){
        var requestHeaders = {
            "Accept" : "application/json",
            "Content-Type" : "application/json",
        };
        
        $.ajax({
            url: Configuracion.ApiUrl + '/auth/login',
            type: 'post',
            headers: requestHeaders,
            data: JSON.stringify(Configuracion.credenciales),
            success: function(data) {
                localStorage.setItem("token",data.access_token);
                return true;
            },
            error: function(data){
                return false;
            }
        });
    }

    function obtenerPaises(){
        var requestHeaders = {
            "Accept" : "application/json",
            "Content-Type" : "application/json",
        };

        $.ajax({
            url: Configuracion.ApiUrl + '/pais/',
            type: 'get',
            headers: requestHeaders,
            success: function(data) {
                mostrarPaises(data);
            },
            error: function(data){
                alert("No se ha podido cargar");
            }
        });
    }

    function mostrarPaises(data){
        $("#paises").empty();
        $.each(data, function(i, item) {
            $("#paises").append(data[i].nombre + "<br>");
        });
    }

    function insertarPais(pais){
        var datos = {"nombre" : pais};

        requestHeaders = {
            "Accept" : "application/json",
            "Content-Type" : "application/json",
            "Authorization" : "Bearer " + localStorage.getItem("token")
        };

        $.ajax({
            url: Configuracion.ApiUrl + '/pais/',
            type: 'post',
            headers: requestHeaders,
            data: JSON.stringify(datos),
            success: function(data) {
                $("#mensaje").html("Guardado");
                $("#nombre").val("");
                obtenerPaises();

            },
            error: function(data){
                alert("Roto");
            }
        });
    }
    obtenerPaises();

    $("#guardar").click(function(){
        if(!checkAutenticacion())
            autenticar();
        insertarPais($("#nombre").val());
    });

});
