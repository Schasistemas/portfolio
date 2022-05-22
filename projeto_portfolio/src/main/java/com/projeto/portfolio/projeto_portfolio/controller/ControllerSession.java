package com.projeto.portfolio.projeto_portfolio.controller;

import javax.servlet.http.HttpSession;

import com.projeto.portfolio.projeto_portfolio.entidades.Usuario;
import com.projeto.portfolio.projeto_portfolio.interfacesdao.InterfaceUsuarioDAO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/session")
public class ControllerSession {

    @Autowired
    private InterfaceUsuarioDAO usuarioDAO;

    @ResponseBody
    @RequestMapping(method = RequestMethod.GET, value = "/user")
    private ResponseEntity<?> buscarUserOn(HttpSession session) {

        try {

            String username = session.getAttribute("nome").toString();
            
            String nome = usuarioDAO.buscarUsuarioPorUsername(username).getNome();
            Long id = usuarioDAO.buscarUsuarioPorUsername(username).getId(); 

            Usuario usuario = new Usuario();
            usuario.setId(id);
            usuario.setNome(nome);

            return ResponseEntity.ok().body(usuario);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }

    }

}
