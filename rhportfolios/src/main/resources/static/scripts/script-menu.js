var BTN_MENU_PORTAL = new Object()

$(document).ready(function () {

     BTN_MENU_PORTAL.fecharMenu = function () {
          $("#header-nav-amb").removeClass("aberto")
          $(".nav-header").removeClass("nav-header-nav-aberto")
          $(".nav-header").removeClass("btn-menu-nav-aberto")
          $(".btn-menu-nav").css({ border: "1px solid rgba(255, 255, 255, 0.473)" })
          $(".a-header-menu").removeClass("a-header-menu-aberto")
          $(".dropdown-user-ident").removeClass("dropdown-user-ident-aberto")
          $(".amb-grafics").css({ width: "98%" })
     }

     $(".btn-menu-nav").click(function () {

          if ($("#header-nav-amb").is(".aberto") == false) {

               $("#header-nav-amb").addClass("aberto")
               $(".nav-header").addClass("nav-header-nav-aberto")
               $(".btn-menu-nav").css({ border: "3px solid #F9BB44" })
               $(".a-header-menu").addClass("a-header-menu-aberto")
               $(".dropdown-user-ident").addClass("dropdown-user-ident-aberto")
               $(".amb-grafics").css({ width: "98%" })
          } else {

               $("#header-nav-amb").removeClass("aberto")
               $(".nav-header").removeClass("nav-header-nav-aberto")
               $(".nav-header").removeClass("btn-menu-nav-aberto")
               $(".btn-menu-nav").css({ border: "1px solid rgba(255, 255, 255, 0.473)" })
               $(".a-header-menu").removeClass("a-header-menu-aberto")
               $(".dropdown-user-ident").removeClass("dropdown-user-ident-aberto")
               $(".amb-grafics").css({ width: "98%" })
          }

     })

     $("#btn-perfil-user").click(function () {
          $(".amb-section").load("/layouts/acessos_user.html")
     })

     $("#btn-imagem-user").click(function () {
          $(".amb-section").load("/layouts/imagem_user.html")
     })

     SESSION.buscarUserOn()

     MENSAGEM_SITE.buscarMensagem()

})