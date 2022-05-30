var MENSAGEM_SITE = new Object()

$(document).ready(function () {

    MENSAGEM_SITE.layoutSite = function () {

        $.ajax({
            url: "/site/buscar",
            method: "GET",
            success: function (mensagem) {

                var layout = '<div class="titulos-amb"><h1>Mensagens de Interações</h1></div><p class="subtitulos-amb">Últimas interações feitas pelo site ao portal.</p><br><br><div class="accordion accordion-flush" id="accordionFlushExample">'

                if (mensagem.length > 0) {

                    for (let i = 0; i < mensagem.length; i++) {

                        layout += '<div class="accordion-item">' +
                            '<h2 class="accordion-header" id="flush-heading' + i + '">' +
                            '<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse' + i + '" aria-expanded="false" aria-controls="flush-collapse' + i + '" onclick="MENSAGEM_SITE.atualizarStatus(' + mensagem[i].id + ')">' +
                            mensagem[i].nome+

                            '&nbsp-&nbsp<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">' +
                            '<path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>' +
                            '<path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>' +
                            '</svg>' +

                            '&nbsp:&nbsp<svg class="icon-ok-status" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle-fill" viewBox="0 0 16 16">' +
                            '<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>' +
                            '</svg>' +

                            '</button>' +
                            '</h2>' +
                            '<div id="flush-collapse' + i + '" class="accordion-collapse collapse" aria-labelledby="flush-heading' + i + '" data-bs-parent="#accordionFlushExample">' +
                            '<div class="accordion-body">Nome: ' + mensagem[i].nome + "<br>E-mail: " + mensagem[i].email + '<br>Data de Envio: ' + mensagem[i].data + '<br>Mensagem:<br><br>' + mensagem[i].texto + '</div>' +
                            '</div>'

                    }

                    layout += '</div>'

                } else {
                    layout += "<p class='subtitulos-amb' style='background-color:red; color:white; padding-left:10px; width:260px;'>Caixa de mensagens está vazia</p>"

                }

                if (mensagem.length < 5) {
                    $(".amb-section").css({ height: "100vh" })
                }

                

                $(".amb-section").html(layout)

                var btn = document.getElementsByClassName("icon-ok-status")

                for (let i = 0; i < mensagem.length; i++) {
                    if (mensagem[i].status == 0) {
                        btn[i].style.color = "red"
                    } else {
                        btn[i].style.color = "#198754"
                    }
                }

            },
            error: function () {

            }
        })
    }


    MENSAGEM_SITE.enviarMensagem = function () {

        var mensagem = new Object();

        mensagem.nome = $("#mensagem-nome").val()
        mensagem.email = $("#mensagem-email").val()
        mensagem.texto = $("#input-textarea").val()

        if (mensagem.nome == "" ||
            mensagem.email == "" ||
            mensagem.texto == "") {

            $("#modalAvisos").html(MODAL.avisoExclam("Preencher todos os campos para enviar mensagem."))
            $("#modalAvisos").modal("show");

        } else {


            var text = mensagem.texto

            mensagem.texto = text.replaceAll("\n", "<br>")


            $.ajax({
                url: "/site/mensagem",
                method: "POST",
                data: JSON.stringify(mensagem),
                contentType: "application/json",
                success: function (mensagem) {

                    $("#modalAvisos").html(MODAL.confirm(mensagem))
                    $("#modalAvisos").modal("show");

                    $("#mensagem-nome").val("")
                    $("#mensagem-email").val("")
                    $("#input-textarea").val("")

                },
                error: function (mensagem) {
                    $("#modalAvisos").html(MODAL.avisoExclam(mensagem))
                    $("#modalAvisos").modal("show");
                }
            })

            MENSAGEM_SITE.layoutSite()

        }

    }

    MENSAGEM_SITE.buscarMensagem = function () {
        $.ajax({
            url: "/site/buscar/mensagem",
            method: "GET",
            success: function (mensagem) {

                var quantidade = mensagem.length

                $("#notif-mensagem, #notif-mensagem2").text(quantidade)


            },
            error: function () {

            }
        })

    }



    MENSAGEM_SITE.atualizarBackgroundStatus = function () {
        $.ajax({
            url: "/site/buscar",
            method: "GET",
            success: function (mensagem) {

                var btn = document.getElementsByClassName("icon-ok-status")

                for (let i = 0; i < mensagem.length; i++) {
                    if (mensagem[i].status == 0) {
                        btn[i].style.color = "#red"
                    } else {
                        btn[i].style.color = "#198754"
                    }
                }

            },
            error: function () {

            }
        })
    }

    MENSAGEM_SITE.atualizarStatus = function (id) {

        $.ajax({
            url: "/site/atualizar/status/" + id,
            method: "PUT",
            success: function () {
                //MENSAGEM_SITE.buscarMensagem()
                MENSAGEM_SITE.atualizarBackgroundStatus()
            },
            error: function () {

            }
        })
    }

})
