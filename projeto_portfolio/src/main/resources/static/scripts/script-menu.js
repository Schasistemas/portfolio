$(document).ready(function () {

     $(".btn-menu-nav").click(function () {
     
          if ($("#header-nav-amb").is(".aberto") == false) {
               $("#header-nav-amb").addClass("aberto")
               $(".header-nav").animate({width:"217px"},0)
               $(".nav-header").css({display:"inherit"})
               $(".btn-menu-nav").css({border:"2px solid #F9BB44"})
               $(".a-header-menu").css({display:"inherit"})
               $(".dropdown-user-ident").css({display:"inherit"})
          } else {
               $("#header-nav-amb").removeClass("aberto")
               $(".header-nav").animate({width:"64px"},500)
               $(".nav-header").css({display:"none"})
               $(".btn-menu-nav").css({border:"1px solid rgba(255, 255, 255, 0.473)"})
               $(".a-header-menu").css({display:"none"})
               $(".dropdown-user-ident").css({display:"none"})
          }

          
     })

})