package com.projeto.portfolio.projeto_portfolio.controller;

import com.projeto.portfolio.projeto_portfolio.entidades.DataCadastro;
import com.projeto.portfolio.projeto_portfolio.entidades.UserToken;
import com.projeto.portfolio.projeto_portfolio.entidades.Usuario;
import com.projeto.portfolio.projeto_portfolio.interfacesdao.InterfaceUsuarioDAO;
import com.projeto.portfolio.projeto_portfolio.service.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/visitante")
public class ControllerNovoUsuario {

    @Autowired
    private InterfaceUsuarioDAO usuarioDAO;

    @Autowired
    private ServiceEmail serviceEmail;

    @Autowired
    private ServiceEmailRedefinirSenha serviceRedefinirSenhaEmail;

    @ResponseBody
    @RequestMapping(method = RequestMethod.POST, value = "/cadastrar", consumes = "application/json")
    public ResponseEntity<?> cadastrar(@RequestBody Usuario usuario) {
        try {

            Usuario usuarioListadoUsername = usuarioDAO.buscarUsuarioPorUsername(usuario.getUsername());
            Usuario usuarioListadoEmail = usuarioDAO.buscarUsuarioPorEmail(usuario.getEmail());

            if (usuarioListadoUsername != null) {
                return ResponseEntity.ok().body("Usuário já esta em uso, inserir outro!");
            } else if(usuarioListadoEmail != null){
                return ResponseEntity.ok().body("E-mail já esta em uso, inserir outro!");
            } else {
                DataCadastro data = new DataCadastro();

                usuario.setDataCadastro(data.getData());

                if (usuario.getAcesso().equals("1")) {
                    usuario.setAcesso("ADMIN");
                } else {
                    usuario.setAcesso("USER");
                }

                BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
                usuario.setPassword(passwordEncoder.encode(usuario.getPassword()));

                usuarioDAO.save(usuario);

                return ResponseEntity.ok().body("Cadastro de " + usuario.getNome() + " finalizado com sucesso.");
            }

        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @ResponseBody
    @PostMapping("/email/{email}")
    public ResponseEntity<?> forgotPassword(@PathVariable("email") String emailuser) {

        String response = serviceEmail.forgotPassword(emailuser);

        if (!response.startsWith("Invalid")) {
            response = "https://rhportfolios.herokuapp.com/novaSenha?token=" + response;
        }

        try {
            serviceRedefinirSenhaEmail.enviarEmail(emailuser, response);
            return ResponseEntity.ok().body(
                    "Um e-mail com link para redefinir sua senha foi enviado para você, verificar na caixa de entrada ou lixo eletrônico.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }

    }

    @ResponseBody
    @PostMapping("/newpas")
    public ResponseEntity<?> resetPassword(@RequestBody UserToken user) {

        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

        String mensagem = serviceEmail.resetPassword(user.getToken(), encoder.encode(user.getInfo2()));

        return ResponseEntity.ok().body(mensagem);
    }

}
