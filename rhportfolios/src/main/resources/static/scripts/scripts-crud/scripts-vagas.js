var VAGAS = new Object();

$(document).ready(function () {

    VAGAS.cadastrarVagas = function () {

        var vaga = new Object();

        if ($("#cod-vaga").val() == 'null') {
            vaga.id = null
        } else {
            vaga.id = $("#cod-vaga").text()
        }

        vaga.nome = $("#input-name-vaga").val()
        vaga.descricao = $("#input-descricao-vaga").val()
        vaga.pricipaisAtividades = $("#input-pricipais-atividades-vaga").val()
        vaga.requisitos = $("#input-requisito-vaga").val()
        vaga.perfil = $("#input-perfil-vaga").val()

        if (vaga.nome == '' ||
            vaga.descricao == '' ||
            vaga.pricipaisAtividades == '' ||
            vaga.requisitos == '' ||
            vaga.perfil == '') {
            $("#modalAvisos").html(MODAL.avisoExclam("Preencher todos os campos para finalizar cadastro da vaga."))
            $("#modalAvisos").modal("show");
        } else {
            $.ajax({
                url: "/vagas/cadastrar",
                method: "POST",
                contentType: "application/json",
                data: JSON.stringify(vaga),
                success: function (mensagem) {
                    $("#form-vagas")[0].reset()
                    $("#modalAvisos").html(MODAL.confirm(mensagem))
                    $("#modalAvisos").modal("show");
                },
                error: function (mensagem) {
                    $("#modalAvisos").html(MODAL.error("Status - "+mensagem.status))
                    $("#modalAvisos").modal("show");
                }

            })

            $("#cod-vaga").html("null")
            $(".conteudo-drop-vagas").css("display", "none")

        }

    }

    VAGAS.buscarCandidatoPorFragmento = function () {

        var informacao = $("#input-name-vaga").val()

        if (informacao == "") {
            $(".conteudo-drop-vagas").css("display", "none")
            $("#form-vagas")[0].reset()
        } else {
            $.ajax({
                url: "/vagas/buscar/framento/" + informacao,
                method: "GET",
                success: function (lista) {

                    var layoutTabela = "";

                    for (let i = 0; i < lista.length; i++) {

                        layoutTabela += "<li class='dropdown-vagas-cadastro' onclick='VAGAS.buscarInformacoesCadastro(" + lista[i].id + ")'>" + lista[i].nome + "<button type='button' class='btns1 btn btn-danger' onclick='MODAL.buscarModalExcluirVaga(" + lista[i].id + ",`" + lista[i].nome + "`)'>EXCLUIR</button></li>";
                    }

                    $(".conteudo-drop-vagas").css("display", "block")

                    $(".conteudo-drop-vagas").html(layoutTabela)
                },
                error: function () {
                    $("#modalAvisos").html(MODAL.error("<div class='amb-text-modal'>Erro: " + mensagem + "</div>"))
                    $("#modalAvisos").modal("show");
                }
            })
        }

    }

    MODAL.buscarModalExcluirVaga = function (cod, nome) {
        $("#modalAvisos").html(MODAL.deleteVaga(cod, "Excluir cadastro de " + nome + " ?"))
        $("#modalAvisos").modal("show");
    }

    VAGAS.excluirCadastro = function (cod) {

        $.ajax({
            url: "/vagas/deletar/id/" + cod,
            method: "DELETE",
            success: function (mensagem) {
                $("#form-vagas")[0].reset()
                $("#modalAvisos").html(MODAL.confirm(mensagem))
                $("#modalAvisos").modal("show");
            },
            error: function (mensagem) {
                $("#modalAvisos").html(MODAL.error("Status - "+mensagem.status))
                $("#modalAvisos").modal("show");
            }
        })
    }

    VAGAS.buscarInformacoesCadastro = function (cod) {
        $.ajax({
            url: "/vagas/buscar/id/" + cod,
            method: "GET",
            success: function (vaga) {
                $("#cod-vaga").html(vaga.id)
                $("#input-name-vaga").addClass(vaga.id)
                $("#input-name-vaga").val(vaga.nome)
                $("#input-descricao-vaga").val(vaga.descricao)
                $("#input-pricipais-atividades-vaga").val(vaga.pricipaisAtividades)
                $("#input-requisito-vaga").val(vaga.requisitos)
                $("#input-perfil-vaga").val(vaga.perfil)
            },
            error: function () {
                $("#modalAvisos").html(MODAL.error("Status - "+mensagem.status))
                $("#modalAvisos").modal("show");
            }
        })
        $(".conteudo-drop-vagas").css("display", "none")
    }

})