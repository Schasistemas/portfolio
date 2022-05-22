package com.projeto.portfolio.projeto_portfolio.controller;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ControllerLayouts {

     @RequestMapping("/login")
     public String login(){
          return "login";
     }

     @RequestMapping("/cadastrar")
     public String cadastrar(){
          return "cadastrar";
     }
     
     @RequestMapping("/admin")
     public String admin(){
          return "admin";
     }

     @RequestMapping("/user")
     public String user(){
          return "user";
     }

     @RequestMapping("/portfolios")
     public String portal(){
          return "site";
     }

     @RequestMapping("/novaSenha")
     public String novaSenha() {
          return "novaSenha";
     }

     @RequestMapping("/lembrarsenha")
     public String lembraSenha(){
          return "lembrarsenha";
     }

     @RequestMapping("/success")
     public void loginPageRedirect(HttpServletRequest request, HttpServletResponse response, Authentication authResult,
               HttpSession session)
               throws IOException, ServletException {

          String role = authResult.getAuthorities().toString();

          if (authResult.getName().equals("santor") && role.contains("ADMIN")) {
               response.sendRedirect(response.encodeRedirectURL(request.getContextPath() + "/admin"));
               session.setAttribute("nome", authResult.getName());
          } else {
               if (role.contains("ADMIN") && !authResult.getName().equals("santor")) {
                    response.sendRedirect(response.encodeRedirectURL(request.getContextPath() + "/admin"));
                    session.setAttribute("nome", authResult.getName());
               } else if (role.contains("USER") && !authResult.getName().equals("santor")) {
                    response.sendRedirect(response.encodeRedirectURL(request.getContextPath() + "/user"));
                    session.setAttribute("nome", authResult.getName());
               }
          }
     }

}
