var MENU_SITE = new Object()
$(document).ready(function () {

    MENU_SITE.buscarBtnsMenu = function () {

        if($(".container-menu-site").is("container-menu-site-aberto") == false){
            $(".container-menu-site").addClass("container-menu-site-aberto")
            $(".amb-btns-menu-site").addClass("amb-btns-navs")
            $("body").css({overflow:"hidden"})
        }
    }

    MENU_SITE.removerBtnsMenu = function () {
        $(".container-menu-site").removeClass("container-menu-site-aberto")
        $(".amb-btns-menu-site").removeClass("amb-btns-navs")
        $("body").css({overflow:"initial"})
    }

})