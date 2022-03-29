package com.projeto.portfolio.projeto_portfolio.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ControllerLayouts {
     
     @RequestMapping("/admin")
     public String admin(){
          return "admin";
     }

}
