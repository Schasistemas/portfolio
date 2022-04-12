var CANDIDATO = new Object();

$(document).ready(function () {

     /*
     CANDIDATO.carregar = function () {
          $.ajax({
               url: "/candidatos/carregar",
               method: "GET",
               success: function (lista) {

                    var layoutTabela = "";

                    if (lista.length == 0) {
                         layoutTabela += "<li class='dropdown-candidato-cadastro'>Ainda não há candidatos cadastrados.</li>";
                    } else {

                         for (let i = 0; i < lista.length; i++) {
                              layoutTabela += "<li class='dropdown-candidato-cadastro' onclick='CANDIDATO.buscarInformacoesCadastro(" + lista[i].id + ")'>" + lista[i].nome + "<button type='button' class='btns1 btn btn-danger' onclick='MODAL.buscarModalExcluirCandidato(" + lista[i].id + ","+lista[i].nome+")'>EXCLUIR</button></li>";
                         }
                    }

                    $(".conteudo-drop-candidato").html(layoutTabela)
               },
               error: function (mensagem) {
                    $("#modalAvisos").html(MODAL.error("<div class='amb-text-modal'>Erro: " + mensagem + "</div>"))
                    $("#modalAvisos").modal("show");
               }
          })
     }
     */

     CANDIDATO.cadastrar = function () {

          var candidato = new Object();

          candidato.nome = $("#input-name-candidato").val();
          candidato.rua = $("#input-rua-candidato").val();
          candidato.numero = $("#input-num-candidato").val();
          candidato.bairro = $("#input-bairro-candidato").val();
          candidato.cidade = $("#input-cidade-candidato").val();
          candidato.estado = $("#input-estado-candidato").val();
          candidato.pais = $("#input-pais-candidato").val();
          candidato.cpf = $("#input-cpf-candidato").val()
          candidato.telefone1 = $("#input-telefone1-candidato").val()
          candidato.telefoneAuxiliar = $("#input-telefone2-candidato").val()

          if (candidato.nome == '' ||
               candidato.rua == '' ||
               candidato.numero == '' ||
               candidato.bairro == '' ||
               candidato.cidade == '' ||
               candidato.estado == '' ||
               candidato.pais == '' ||
               candidato.cpf == '' ||
               candidato.telefone1 == '' ||
               candidato.telefoneAuxiliar == '') {

               $("#modalAvisos").html(MODAL.avisoExclam("Preencher todos os campos para finalizar cadastro."))
               $("#modalAvisos").modal("show");

          } else {

               $.ajax({
                    url: "/candidatos/cadastrar",
                    method: "POST",
                    contentType: "application/json",
                    data: JSON.stringify(candidato),
                    success: function (mensagem) {
                         $("#form-candidatos")[0].reset()
                         $("#modalAvisos").html(MODAL.confirm(mensagem))
                         $("#modalAvisos").modal("show");
                    },
                    error: function (mensagem) {
                         $("#modalAvisos").html(MODAL.error(mensagem))
                         $("#modalAvisos").modal("show");
                    }
               })


          }

     }

     CANDIDATO.buscarCandidatoPorFragmento = function () {

          var informacao = $("#input-name-candidato").val()

          if (informacao == "") {
               $(".conteudo-drop-candidato").css("display", "none")
               $("#form-candidatos")[0].reset()
          } else {
               $.ajax({
                    url: "/candidatos/buscar/framento/" + informacao,
                    method: "GET",
                    success: function (lista) {
                         var layoutTabela = "";

                         for (let i = 0; i < lista.length; i++) {
                              layoutTabela += "<li class='dropdown-candidato-cadastro' onclick='CANDIDATO.buscarInformacoesCadastro(" + lista[i].id + ")'>" + lista[i].nome + "<button type='button' class='btns1 btn btn-danger' onclick='MODAL.buscarModalExcluirCandidato(" + lista[i].id + ",`"+lista[i].nome+"`)'>EXCLUIR</button></li>";
                         }

                         $(".conteudo-drop-candidato").css("display", "block")

                         $(".conteudo-drop-candidato").html(layoutTabela)
                    },
                    error: function () {
                         $("#modalAvisos").html(MODAL.error("<div class='amb-text-modal'>Erro: " + mensagem + "</div>"))
                         $("#modalAvisos").modal("show");
                    }
               })
          }
     }

     CANDIDATO.buscarInformacoesCadastro = function (cod) {
          $.ajax({
               url: "/candidatos/buscar/id/" + cod,
               method: "GET",
               success: function (candidato) {
                    $("#input-name-candidato").val(candidato.nome);
                    $("#input-rua-candidato").val(candidato.rua);
                    $("#input-num-candidato").val(candidato.numero);
                    $("#input-bairro-candidato").val(candidato.bairro);
                    $("#input-cidade-candidato").val(candidato.cidade);
                    $("#input-estado-candidato").val(candidato.estado);
                    $("#input-pais-candidato").val(candidato.pais);
                    $("#input-cpf-candidato").val(candidato.cpf)
                    $("#input-telefone1-candidato").val(candidato.telefone1)
                    $("#input-telefone2-candidato").val(candidato.telefoneAuxiliar)
               },
               error: function () {
                    $("#modalAvisos").html(MODAL.error(mensagem))
                    $("#modalAvisos").modal("show");
               }
          })
          $(".conteudo-drop-candidato").css("display", "none")
     }

     MODAL.buscarModalExcluirCandidato = function (cod,nome) {
          $("#modalAvisos").html(MODAL.delete(cod,"Excluir cadastro de "+nome+" ?"))
          $("#modalAvisos").modal("show");
     }

     CANDIDATO.excluirCadastro = function (cod) {

          $.ajax({
               url:"/candidatos/deletar/id/"+cod,
               method:"DELETE",
               success:function (mensagem) {
                    $("#form-candidatos")[0].reset()
                    $("#modalAvisos").html(MODAL.confirm(mensagem))
                    $("#modalAvisos").modal("show");
               },
               error:function (mensagem) {
                    $("#modalAvisos").html(MODAL.error("Status - "+mensagem.status))
                    $("#modalAvisos").modal("show");  
               }
          })
     }
})