var BTN_NAV = new Object();

$(document).ready(function () {
     
     window.scrollTo(0, 0);
     $(".amb-section").load("layouts/dachboard.html");
     
     BTN_NAV.buscarLayout = function (index) {
          if (index == 1) {
               $(".amb-section").load("layouts/dachboard.html")
               window.scrollTo(0, 0);
          } else if (index == 2) {
               $(".amb-section").load("layouts/candidatos.html")
               window.scrollTo(0, 0);
          } else if (index == 3) {
               $(".amb-section").load("layouts/vagas.html")
               window.scrollTo(0, 0);
          } else if (index == 4) {
               $(".amb-section").load("layouts/clientes.html")
               window.scrollTo(0, 0);
          } else if (index == 6) {
               $(".amb-section").load("layouts/acessos.html")
               window.scrollTo(0, 0);
          } else if (index == 0) {
               $(".amb-section").load("layouts/dachboard.html")
               window.scrollTo(0, 0);
          }
     }

})