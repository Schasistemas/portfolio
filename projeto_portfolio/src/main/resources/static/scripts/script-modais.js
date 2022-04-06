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
               mensagem +
               '</div>' +
               '<div class="modal-footer">' +
               '<button type="button" class="btn btn-secondary" data-dismiss="modal">OK</button>' +
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
               mensagem +
               '</div>' +
               '<div class="modal-footer">' +
               '<button type="button" class="btn btn-secondary" data-dismiss="modal">OK</button>' +
               '</div>' +
               '</div>' +
               '</div>'
     }

})