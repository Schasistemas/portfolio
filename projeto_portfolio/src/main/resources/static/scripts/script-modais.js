var MODAL = new Object();

$(document).ready(function () {

     MODAL.avisoExclam = function (mensagem) {
          return '<div class="modal-dialog" role="document">' +
               '<div class="modal-content">' +
               '<div class="modal-header">' +
               '<h5 class="modal-title" id="exampleModalLabel">AVISO</h5>' +
               '</div>' +
               '<div class="modal-body">' +
               '<div class="amb-ascent-modal"><div class="style-ascent-exclam"><h1>!</h1></div></div>'+
               '<div class="amb-text-modal">' + mensagem + '</div>'+
               '</div>' +
               '<div class="modal-footer">' +
               '<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">OK</button>' +
               '</div>' +
               '</div>' +
               '</div>'
     }

     MODAL.confirm = function (mensagem) {
          return '<div class="modal-dialog" role="document">' +
               '<div class="modal-content">' +
               '<div class="modal-header">' +
               '<h5 class="modal-title" id="exampleModalLabel">AVISO</h5>' +
               '</div>' +
               '<div class="modal-body">' +
               '<div class="amb-ascent-modal"><div class="style-ascent-confirm"><h1>&#10003</h1></div></div>'+
               '<div class="amb-text-modal">' + mensagem + '</div>'+
               '</div>' +
               '<div class="modal-footer">' +
               '<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">OK</button>' +
               '</div>' +
               '</div>' +
               '</div>'
     }

     MODAL.delete = function (cod,mensagem) {
          return '<div class="modal-dialog" role="document">' +
          '<div class="modal-content">' +
          '<div class="modal-header">' +
          '<h5 class="modal-title" id="exampleModalLabel">AVISO</h5>' +
          '</div>' +
          '<div class="modal-body">' +
          '<div class="amb-ascent-modal"><div class="style-ascent-interrog"><h1>?</h1><br></div></div>'+
          '<div class="amb-text-modal">' + mensagem + '</div>'+
          '</div>' +
          '<div class="modal-footer">' +
          '<button type="button" class="btn btn-success" onclick="CANDIDATO.excluirCadastro('+cod+')">OK</button>' +
          '<button type="button" class="btn btn-danger" data-bs-dismiss="modal">CANCELAR</button>' +
          '</div>' +
          '</div>' +
          '</div>'
     }

     MODAL.error = function (mensagem) {
          return '<div class="modal-dialog" role="document">' +
               '<div class="modal-content">' +
               '<div class="modal-header">' +
               '<h5 class="modal-title" id="exampleModalLabel">AVISO</h5>' +
               '</div>' +
               '<div class="modal-body">' +
               '<div class="amb-ascent-modal"><div class="style-ascent-exclam"><h1>X</h1></div></div>'+
               '<div class="amb-text-modal">Erro: ' + mensagem + '</div>'+
               '</div>' +
               '<div class="modal-footer">' +
               '<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">OK</button>' +
               '</div>' +
               '</div>' +
               '</div>'
     }

})