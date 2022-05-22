package com.projeto.portfolio.projeto_portfolio.controller;

import java.util.List;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.projeto.portfolio.projeto_portfolio.entidades.DataCadastro;
import com.projeto.portfolio.projeto_portfolio.entidades.Usuario;
import com.projeto.portfolio.projeto_portfolio.interfacesdao.InterfaceUsuarioDAO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

@Controller
@RequestMapping("/usuario")
public class ControllerUsuario {

    @Autowired
    private InterfaceUsuarioDAO usuarioDAO;

    @ResponseBody
    @RequestMapping(method = RequestMethod.POST, value = "/cadastrar", consumes = "multipart/form-data")
    public ResponseEntity<?> cadastrar(String nome, String cpf, String email, String telefone, String acesso,
            String username,
            String password) {

        try {

            Usuario usuarioListado = usuarioDAO.buscarUsuarioPorEmail(email);

            if (usuarioListado == null) {

                if (acesso.equals("1")) {
                    acesso = "ADMIN";
                } else {
                    acesso = "USER";
                }

                Usuario usuario = usuarioDAO.buscarUsuarioPorCpf(cpf);

                if (usuario == null) {

                    DataCadastro dataCadastro = new DataCadastro();

                    Usuario usuarioNovo = new Usuario(nome, cpf, email, telefone, acesso, username, password,
                            dataCadastro.getData());

                    BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

                    usuarioNovo.setPassword(encoder.encode(password));

                    usuarioDAO.save(usuarioNovo);

                    return ResponseEntity.ok().body("Informações de usuário recebidas com sucesso");
                } else {

                    usuario.setNome(nome);
                    usuario.setCpf(cpf);
                    usuario.setEmail(email);
                    usuario.setTelefone(telefone);
                    usuario.setAcesso(acesso);

                    Usuario usuarioAtualizado = usuarioDAO.save(usuario);

                    return ResponseEntity.ok()
                            .body("Cadastro de " + usuarioAtualizado.getNome() + " atualizado com sucesso.");
                }
            } else {
                return ResponseEntity.ok().body("E-mail já esta em uso, inserir outro!");
            }

        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }

    }

    @ResponseBody
    @RequestMapping(method = RequestMethod.POST, value = "/atualizar/{cod}")
    public ResponseEntity<?> atualizar(@PathVariable("cod") Long cod, String nome, String cpf, String email,
            String telefone,
            String username) {

        try {

            Usuario usuarioListado = usuarioDAO.buscarUsuarioPorEmail(email);

            if (usuarioListado == null) {

                return usuarioDAO.findById(cod).map(usuarioFiltrado -> {

                    usuarioFiltrado.setNome(nome);
                    usuarioFiltrado.setCpf(cpf);
                    usuarioFiltrado.setEmail(email);
                    usuarioFiltrado.setTelefone(telefone);
                    usuarioFiltrado.setUsername(username);

                    Usuario usuarioAtualizado = usuarioDAO.save(usuarioFiltrado);

                    return ResponseEntity.ok()
                            .body("Cadastro de " + usuarioAtualizado.getNome() + " atualizado com sucesso.");
                }).orElse(ResponseEntity.ok().body("Erro ao alterar cadastro, contatar administrador de sistema."));

            } else {
                return ResponseEntity.ok().body("E-mail já esta em uso, inserir outro!");
            }

        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }

    }

    @ResponseBody
    @RequestMapping(method = RequestMethod.GET, value = "/buscar/framento/{informacao}")
    public ResponseEntity<?> buscarPorFramento(@PathVariable("informacao") String informacao) {

        try {

            List<Usuario> listaCandidatos = usuarioDAO.buscarCandidatosPorFragmento(informacao);

            return ResponseEntity.ok().body(listaCandidatos);
        } catch (Exception e) {
            return ResponseEntity.ok()
                    .body("Erro ao carregar lista de usuários, consultar administrador de sistema.");
        }
    }

    @ResponseBody
    @RequestMapping(method = RequestMethod.GET, value = "/buscar/id/{id}")
    public ResponseEntity<?> buscarPorId(@PathVariable("id") Long id) {

        try {

            Usuario usuario = usuarioDAO.buscarUsuarioPorId(id);

            return ResponseEntity.ok().body(usuario);
        } catch (Exception e) {
            return ResponseEntity.ok().body(
                    "Erro ao carregar cadastro de usuário selecionado, consultar administrador de sistema.");
        }
    }

    @ResponseBody
    @RequestMapping(method = RequestMethod.DELETE, value = "/deletar/id/{id}")
    public ResponseEntity<?> deletar(@PathVariable("id") Long id) {

        try {

            return usuarioDAO.findById(id).map(usuario -> {
                usuarioDAO.delete(usuario);
                return ResponseEntity.ok().body("Cadastro de " + usuario.getNome() + " excluido com sucesso.");
            }).orElse(ResponseEntity.ok().body(
                    "Erro ao excluir cadastro de usuário selecionado, consultar administrador de sistema."));
        } catch (Exception e) {
            return ResponseEntity.ok().body(
                    "Erro ao excluir cadastro de usuário selecionado, consultar administrador de sistema.");
        }
    }

    @ResponseBody
    @RequestMapping(method = RequestMethod.POST, value = "/imagem/salvar", consumes = "multipart/form-data")
    public ResponseEntity<?> salvarImagemUsuario(@RequestParam("imagem") MultipartFile imagem, String nome) {
        try {

            Usuario usuario = usuarioDAO.buscarUsuarioPorNome(nome);

            usuario.setImagem(imagem.getBytes());

            usuarioDAO.save(usuario);

            return ResponseEntity.ok().body("Sua imagem foi salva com sucesso.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @ResponseBody
    @RequestMapping(method = RequestMethod.GET, value = "/imagem/carregar")
    public void downloadMateriais(HttpSession session, HttpServletResponse response) {

        Usuario usuario = usuarioDAO.buscarUsuarioPorUsername(session.getAttribute("nome").toString());

        try {

            ServletOutputStream out = response.getOutputStream();

            response.setContentType("application/octet-stream");

            String headerKey = "Content-Disposition";
            String headerValue = "attachment; filename=" + usuario.getNome();

            response.setHeader(headerKey, headerValue);

            out.write(usuario.getImagem());

        } catch (Exception e) {

        }

    }

}
