var NEW_USER = new Object();
$(document).ready(function () {

    NEW_USER.cadastrarUsuario = function () {

        var usuario = new Object()

        usuario.nome = $("#visitant-nome").val()
        usuario.cpf = $("#visitant-cpf").val()
        usuario.email = $("#visitant-email").val()
        usuario.telefone = $("#visitant-telefone").val()
        usuario.acesso = $("#visitant-acesso").val()
        usuario.username = $("#visitant-usuario").val()
        usuario.password = $("#visitant-password").val()

        if (usuario.nome == "" ||
            usuario.cpf == "" ||
            usuario.email == "" ||
            usuario.telefone == "" ||
            usuario.acesso == "0" ||
            usuario.username == "" ||
            usuario.password == "") {

            $("#modalAvisos").html(MODAL.avisoExclam("Preencher todos os campos para finalizar cadastro."))
            $("#modalAvisos").modal("show");

        } else {
            $.ajax({
                url: "/visitante/cadastrar",
                method: "POST",
                data: JSON.stringify(usuario),
                contentType: "application/json",
                success: function (mensagem) {

                    if (mensagem == "Usuário já esta em uso, inserir outro!" || mensagem == "E-mail já esta em uso, inserir outro!") {
                        $("#modalAvisos").html(MODAL.avisoExclam(mensagem))
                    } else {
                        $("#form-visitant")[0].reset()
                        $("#modalAvisos").html(MODAL.confirmNewUser(mensagem))
                    }

                    $("#modalAvisos").modal("show");
                },
                error: function (mensagem) {
                    $("#modalAvisos").html(MODAL.error("Status - " + mensagem.status))
                    $("#modalAvisos").modal("show");
                }

            })
        }


    }

    NEW_USER.enviarEmail = function () {

        var usuario = new Object()

        usuario.email = $("#visitant-email").val()

        if (usuario.email == "") {

            $("#modalAvisos").html(MODAL.avisoExclam("Preencher campo para enviar e-mail!"))
            $("#modalAvisos").modal("show");

        } else {
            $.ajax({
                url: "/visitante/email/" + usuario.email,
                method: "POST",
                success: function (mensagem) {
                    $("#visitant-email").val("")
                    $("#modalAvisos").html(MODAL.confirmNewUser(mensagem))
                    $("#modalAvisos").modal("show");
                },
                error: function (mensagem) {
                    $("#modalAvisos").html(MODAL.error("Status - " + mensagem.status))
                    $("#modalAvisos").modal("show");
                }

            })
        }

    }

    NEW_USER.enviarInformacao = function () {

        var url = window.location.href

        url = url.split('?token=')
        url = url[1]

        var info1 = $("#visitant-nova-senha").val()
        var info2 = $("#visitant-confirme-nova-senha").val()

        var confirm = false;
        var mensagem = "";

        if (info1 == '' && info2 == '') {

            mensagem = "Preencher os campos para enviar informações.";
            confirm = true;
        }

        if (info1 !== info2) {
            mensagem = "A senha nova precisa ser igual nos dois campos!";
            confirm = true;
        }

        if (confirm) {

            $("#modalAvisos").html(MODAL.avisoExclam(mensagem));
            $("#modalAvisos").modal("show");

        } else {

            var user = new Object()

            user.info2 = info2
            user.token = url

            $.ajax({
                url: "/visitante/newpas",
                method: "POST",
                contentType: "application/json",
                data: JSON.stringify(user),
                success: function (mensagem) {

                    if (mensagem == "Token de usuário é inválido.") {
                        $("#modalAvisos").html(MODAL.avisoExclam(mensagem));
                        $("#modalAvisos").modal("show");
                    } else if (mensagem == "Token expirado.") {
                        $("#modalAvisos").html(MODAL.avisoExclam(mensagem));
                        $("#modalAvisos").modal("show");
                    } else {
                        $("#visitant-nova-senha").val("")
                        $("#visitant-confirme-nova-senha").val("")
                        $("#modalAvisos").html(MODAL.confirmNewUser(mensagem));
                        $("#modalAvisos").modal("show");
                    }

                },
                error: function (mensagem) {
                    $("#modalAvisos").html(MODAL.error("Status - " + mensagem.status));
                    $("#modalAvisos").modal("show");
                }
            })

        }

    }

})