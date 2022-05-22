var SESSION = new Object();

$(document).ready(function () {

    SESSION.buscarUserOn = function () {

        $.ajax({
            url: "/session/user",
            method: "GET",
            success: function (user) {

                $("#btn-user-on").html(user.nome)
                $("#id-user-on").html(user.id)
            },
            error: function (mensagem) {
                $("#modalAvisos").html(MODAL.error("Status - " + mensagem.status))
                $("#modalAvisos").modal("show");
            }
        })

    }

})