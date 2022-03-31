var BTN_NAV = new Object();

$(document).ready(function () {
     
     BTN_NAV.buscarLayout = function (index) {
          if (index == 1) {
               $(".amb-section").load("layouts/dachboard.html")
          } else if (index == 2) {
               $(".amb-section").load("layouts/candidatos.html")
          } else if (index == 3) {
               $(".amb-section").load("layouts/vagas.html")
          }
     }

})