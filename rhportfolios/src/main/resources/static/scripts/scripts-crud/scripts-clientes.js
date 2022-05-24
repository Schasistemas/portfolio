var CLIENTES = new Object();

$(document).ready(function () {

    CLIENTES.cadastrar = function () {

        var cliente = new Object();

        cliente.nome = $("#input-name-cliente").val()
        cliente.atuacao = $("#input-mercado-atuacao-cliente").val()
        cliente.rua = $("#input-rua-cliente").val()
        cliente.numero = $("#input-num-cliente").val()
        cliente.bairro = $("#input-bairro-cliente").val()
        cliente.cidade = $("#input-cidade-cliente").val()
        cliente.estado = $("#input-estado-cliente").val()
        cliente.pais = $("#input-pais-cliente").val()
        cliente.cnpj = $("#input-cnpj-cliente").val()
        cliente.telefone1 = $("#input-telefone1-cliente").val()
        cliente.telefone2 = $("#input-telefone2-cliente").val()


        if (cliente.nome == "" ||
            cliente.atuacao == "" ||
            cliente.rua == "" ||
            cliente.numero == "" ||
            cliente.bairro == "" ||
            cliente.cidade == "" ||
            cliente.estado == "" ||
            cliente.pais == "" ||
            cliente.cnpj == "" ||
            cliente.telefone1 == "" ||
            cliente.telefone2 == "") {

            $("#modalAvisos").html(MODAL.avisoExclam("Preencher todos os campos para finalizar cadastro."))
            $("#modalAvisos").modal("show");

        } else {

            $.ajax({
                url: "/clientes/cadastrar",
                method: "POST",
                contentType: "application/json",
                data: JSON.stringify(cliente),
                success: function (mensagem) {
                    $("#form-duvidas-sites")[0].reset()
                    $("#modalAvisos").html(MODAL.confirm(mensagem))
                    $("#modalAvisos").modal("show");
                },
                error: function (mensagem) {
                    $("#modalAvisos").html(MODAL.error("Status - " + mensagem.status))
                    $("#modalAvisos").modal("show");
                }
            })

        }

    }

    CLIENTES.buscarCandidatoPorFragmento = function () {

        var informacao = $("#input-name-cliente").val()

        if (informacao == "") {
            $(".conteudo-drop-clientes").css("display", "none")
            $("#form-clientes")[0].reset()
        } else {
            $.ajax({
                url: "/clientes/buscar/framento/" + informacao,
                method: "GET",
                success: function (lista) {
                    var layoutTabela = "";

                    for (let i = 0; i < lista.length; i++) {
                        layoutTabela += "<li class='dropdown-candidato-cadastro' onclick='CLIENTES.buscarInformacoesCadastro(" + lista[i].id + ")'>" + lista[i].nome + "<button type='button' class='btns1 btn btn-danger' onclick='MODAL.buscarModalExcluirClientes(" + lista[i].id + ",`" + lista[i].nome + "`)'>EXCLUIR</button></li>";
                    }

                    $(".conteudo-drop-clientes").css("display", "block")

                    $(".conteudo-drop-clientes").html(layoutTabela)
                },
                error: function () {
                    $("#modalAvisos").html(MODAL.error("<div class='amb-text-modal'>Erro: " + mensagem + "</div>"))
                    $("#modalAvisos").modal("show");
                }
            })
        }

    }

    CLIENTES.buscarInformacoesCadastro = function (cod) {
        $.ajax({
            url: "/clientes/buscar/id/" + cod,
            method: "GET",
            success: function (cliente) {
                $("#input-name-cliente").val(cliente.nome)
                $("#input-mercado-atuacao-cliente").val(cliente.atuacao)
                $("#input-rua-cliente").val(cliente.rua)
                $("#input-num-cliente").val(cliente.numero)
                $("#input-bairro-cliente").val(cliente.bairro)
                $("#input-cidade-cliente").val(cliente.cidade)
                $("#input-estado-cliente").val(cliente.estado)
                $("#input-pais-cliente").val(cliente.pais)
                $("#input-cnpj-cliente").val(cliente.cnpj)
                $("#input-telefone1-cliente").val(cliente.telefone1)
                $("#input-telefone2-cliente").val(cliente.telefone2)
            },
            error: function () {
                $("#modalAvisos").html(MODAL.error("Status - " + mensagem.status))
                $("#modalAvisos").modal("show");
            }
        })
        $(".conteudo-drop-clientes").css("display", "none")
    }

    MODAL.buscarModalExcluirClientes = function (cod, nome) {
        $("#modalAvisos").html(MODAL.deleteCliente(cod, "Excluir cadastro de " + nome + " ?"))
        $("#modalAvisos").modal("show");
    }

    CLIENTES.excluirCadastro = function (cod) {

        $.ajax({
            url: "/clientes/deletar/id/" + cod,
            method: "DELETE",
            success: function (mensagem) {
                $("#form-clientes")[0].reset()
                $("#modalAvisos").html(MODAL.confirm(mensagem))
                $("#modalAvisos").modal("show");
            },
            error: function (mensagem) {
                $("#modalAvisos").html(MODAL.error("Status - " + mensagem.status))
                $("#modalAvisos").modal("show");
            }
        })
    }

})