var CANDIDATO = new Object();

$(document).ready(function () {

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

                    $("#modalAvisos").html(MODAL.avisoExclam("<div class='amb-text-modal'>Preencher todos os campos para finalizar cadastro.</div>"))
                    $("#modalAvisos").modal("show");

          } else {
               $("#modalAvisos").html(MODAL.confirm("<div class='amb-text-modal'>Cadastro finalizado com sucesso.</div>"))
               $("#modalAvisos").modal("show");;
          }

     }

})