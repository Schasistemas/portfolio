var BTN_NAV = new Object();
var BTN_DROP = new Object();

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
          } else if (index == 5) {
               window.location.href = "/portfolios"
          } else if (index == 6) {
               $(".amb-section").load("layouts/acessos.html")
               window.scrollTo(0, 0);
          } else if (index == 0) {
               $(".amb-section").load("layouts/dachboard.html")
               window.scrollTo(0, 0);
          }

          $("#header-nav-amb").removeClass("aberto")
          $(".nav-header").removeClass("nav-header-nav-aberto")
          $(".a-header-menu").removeClass("a-header-menu-aberto")
          $(".dropdown-user-ident").removeClass("dropdown-user-ident-aberto")
          //$(".nav-header").removeClass("btn-menu-nav-aberto")
          $(".btn-menu-nav").css({ border: "1px solid rgba(255, 255, 255, 0.473)" })
     
     }

})