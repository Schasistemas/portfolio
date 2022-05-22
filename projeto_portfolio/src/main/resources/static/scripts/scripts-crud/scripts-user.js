var USER = new Object();
$(document).ready(function () {

    USER.cadastrar = function () {

        var usuario = new Object();

        var validaUser = false

        usuario.nome = $("#input-name-user").val()
        usuario.cpf = $("#input-cpf-user").val()
        usuario.email = $("#input-emai-user").val()
        usuario.telefone = $("#input-telefone-user").val()
        usuario.acesso = $("#select-acesso").val()
        usuario.username = $("#input-ususario-user").val()
        usuario.password = $("#input-pass-user").val()


        if (usuario.acesso == "0") {
            mensagem = "Selecionar nível de acesso para usuário.";
            validaUser = true
        }

        if (usuario.nome == "" ||
            usuario.cpf == "" ||
            usuario.email == "" ||
            usuario.telefone == "" ||
            usuario.username == "" ||
            usuario.password == "") {

            $("#modalAvisos").html(MODAL.avisoExclam("Preencher todos os campos para finalizar cadastro."))
            $("#modalAvisos").modal("show");

        } else {

            if (validaUser) {
                $("#modalAvisos").html(MODAL.avisoExclam("Selecionar nível de acesso para usuário."))
                $("#modalAvisos").modal("show");
            } else {

                var formulario = new FormData($("#form-users")[0])

                formulario.append("nome", usuario.nome)
                formulario.append("cpf", usuario.cpf)
                formulario.append("email", usuario.email)
                formulario.append("telefone", usuario.telefone)
                formulario.append("acesso ", usuario.acesso)
                formulario.append("username", usuario.username)
                formulario.append("password", usuario.password)


                $.ajax({
                    url: "/usuario/cadastrar",
                    method: "POST",
                    data: formulario,
                    processData: false,
                    contentType: false,
                    success: function (mensagem) {

                        if (mensagem == "E-mail já esta em uso, inserir outro!") {
                            $("#modalAvisos").html(MODAL.avisoExclam(mensagem))
                            $("#modalAvisos").modal("show");
                        } else {
                            setTimeout(SESSION.buscarUserOn(),2000)
                            $('#form-users')[0].reset();
                            $("#modalAvisos").html(MODAL.confirm(mensagem))
                            $("#modalAvisos").modal("show");
                            
                        }
                    },
                    error: function (mensagem) {
                        $("#modalAvisos").html(MODAL.error("Status - " + mensagem.status))
                        $("#modalAvisos").modal("show");
                    }
                })

            }

        }

    }

    USER.buscarUserPorFragmento = function () {

        var informacao = $("#input-name-user").val()

        if (informacao == "") {
            $(".conteudo-drop-user").css("display", "none")
            $("#form-users")[0].reset()
        } else {
            $.ajax({
                url: "/usuario/buscar/framento/" + informacao,
                method: "GET",
                success: function (lista) {
                    var layoutTabela = "";

                    for (let i = 0; i < lista.length; i++) {
                        layoutTabela += "<li class='dropdown-user-cadastro' onclick='USER.buscarInformacoesCadastro(" + lista[i].id + ")'>" + lista[i].nome + "<button type='button' class='btns1 btn btn-danger' onclick='MODAL.buscarModalExcluirUser(" + lista[i].id + ",`" + lista[i].nome + "`)'>EXCLUIR</button></li>";
                    }

                    $(".conteudo-drop-user").css("display", "block")

                    $(".conteudo-drop-user").html(layoutTabela)
                },
                error: function () {
                    $("#modalAvisos").html(MODAL.error("<div class='amb-text-modal'>Erro: " + mensagem + "</div>"))
                    $("#modalAvisos").modal("show");
                }
            })
        }

    }

    USER.buscarInformacoesCadastro = function (cod) {
        $.ajax({
            url: "/usuario/buscar/id/" + cod,
            method: "GET",
            success: function (usuario) {
                $("#input-name-user").val(usuario.nome)
                $("#input-cpf-user").val(usuario.cpf)
                $("#input-emai-user").val(usuario.email)
                $("#input-telefone-user").val(usuario.telefone)
    
                if (usuario.acesso !== "USER") {
                    $("#select-acesso").val("1").change();
                } else {
                    $("#select-acesso").val("2").change();
                }

                $("#input-ususario-user").val(usuario.username)
                $("#input-pass-user").val(usuario.password)
            },
            error: function () {
                $("#modalAvisos").html(MODAL.error("Status - " + mensagem.status))
                $("#modalAvisos").modal("show");
            }
        })
        $(".conteudo-drop-user").css("display", "none")
    }

    USER.atualizarDados = function () {

        var cod = $("#id-user-on").text()

        var usuario = new Object();

        usuario.nome = $("#input-name-user").val()
        usuario.cpf = $("#input-cpf-user").val()
        usuario.email = $("#input-emai-user").val()
        usuario.telefone = $("#input-telefone-user").val()
        usuario.username = $("#input-ususario-user").val()

        if (usuario.nome == "" ||
            usuario.cpf == "" ||
            usuario.email == "" ||
            usuario.telefone == "" ||
            usuario.username == "") {

            $("#modalAvisos").html(MODAL.avisoExclam("Preencher todos os campos para finalizar cadastro."))
            $("#modalAvisos").modal("show");

        } else {

            var formulario = new FormData($("#form-users")[0])

                formulario.append("id",cod)
                formulario.append("nome", usuario.nome)
                formulario.append("cpf", usuario.cpf)
                formulario.append("email", usuario.email)
                formulario.append("telefone", usuario.telefone)
                formulario.append("acesso ", usuario.acesso)
                formulario.append("username", usuario.username)
            
                $.ajax({
                    url: "/usuario/atualizar/"+cod,
                    method: "POST",
                    data: formulario,
                    processData: false,
                    contentType: false,
                    success: function (mensagem) {

                        if (mensagem == "E-mail já esta em uso, inserir outro!") {
                            $("#modalAvisos").html(MODAL.avisoExclam(mensagem))
                            $("#modalAvisos").modal("show");
                        } else {
                            
                            window.location.href = "/login"
                            
                        }
                    },
                    error: function (mensagem) {
                        $("#modalAvisos").html(MODAL.error("Status - " + mensagem.status))
                        $("#modalAvisos").modal("show");
                    }
                })


        }

        
    }

    MODAL.buscarModalExcluirUser = function (cod, nome) {
        $("#modalAvisos").html(MODAL.deleteUser(cod, "Excluir cadastro de " + nome + " ?"))
        $("#modalAvisos").modal("show");
    }

    USER.excluirCadastro = function (cod) {

        $.ajax({
            url: "/usuario/deletar/id/" + cod,
            method: "DELETE",
            success: function (mensagem) {
                $("#form-users")[0].reset()
                $("#modalAvisos").html(MODAL.confirm(mensagem))
                $("#modalAvisos").modal("show");
            },
            error: function (mensagem) {
                $("#modalAvisos").html(MODAL.error("Status - " + mensagem.status))
                $("#modalAvisos").modal("show");
            }
        })
    }

    USER.salvarImagem = function () {

        var validArquivo = false;

        var usuario = new Object()

        usuario.imagem = $("#input-img-user").val()
        usuario.nome = $("#btn-user-on").text()

        var reg = /(.*?)\.(jpg|jpeg|png)$/;

        if (!usuario.imagem.match(reg)) {
            validArquivo = true
        }

        if (validArquivo) {
            $("#modalAvisos").html(MODAL.avisoExclam("Imagem inválida ou vazio, inserir imagens do tipo jpg, jpeg, png."))
            $("#modalAvisos").modal("show");
        } else {

            var formulario = new FormData($("#form-users")[0])

            formulario.append("imagem", usuario.imagem)
            formulario.append("nome", usuario.nome)

            $.ajax({
                url: "/usuario/imagem/salvar",
                method: "POST",
                data: formulario,
                processData: false,
                contentType: false,
                success: function (mensagem) {
                    $('#form-users')[0].reset();
                    $("#modalAvisos").html(MODAL.confirm(mensagem))
                    $("#modalAvisos").modal("show");
                    USER.carregarImagemUserOn()
                },
                error: function (mensagem) {
                    $("#modalAvisos").html(MODAL.error("Status - " + mensagem.status))
                    $("#modalAvisos").modal("show");
                }
            })
        }

    }

    function response() {
        var urlCreator = window.URL || window.webkitURL;
        var imageUrl = urlCreator.createObjectURL(this.response);
        
        if (this.response.size > 0) {
            $(".image-user").html("<img id='image-user' src="+imageUrl+" alt='image-user'>")
        } 

     }

    USER.carregarImagemUserOn = function () {

        var xhr = new XMLHttpRequest();
        xhr.open("GET", "/usuario/imagem/carregar");
        xhr.responseType = "blob";
        xhr.onload = response;
        xhr.send();

    }

    USER.carregarImagemUserOn()

})