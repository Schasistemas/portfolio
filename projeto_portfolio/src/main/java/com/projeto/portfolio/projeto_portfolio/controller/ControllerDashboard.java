package com.projeto.portfolio.projeto_portfolio.controller;

import java.util.List;

import com.projeto.portfolio.projeto_portfolio.interfacesdao.InterfaceCandidatoDAO;
import com.projeto.portfolio.projeto_portfolio.interfacesdao.InterfaceClientes;
import com.projeto.portfolio.projeto_portfolio.interfacesdao.InterfaceUsuarioDAO;
import com.projeto.portfolio.projeto_portfolio.interfacesdao.InterfaceVagaDAO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/dashboard")
public class ControllerDashboard {

    @Autowired
    private InterfaceCandidatoDAO candidatoDAO;

    @Autowired
    private InterfaceVagaDAO vagasDAO;

    @Autowired
    private InterfaceClientes clientesDAO;

    @Autowired
    private InterfaceUsuarioDAO usuarioDAO;

    @ResponseBody
    @RequestMapping(method = RequestMethod.GET, value = "/carregar/candidatos")
    public ResponseEntity<?> carregarDashboardCandidatos() {
        try {

            List<String> listaDeCadastros = candidatoDAO.listaDeCadastrosCandidatos();

            return ResponseEntity.ok().body(listaDeCadastros);

        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @ResponseBody
    @RequestMapping(method = RequestMethod.GET, value = "/carregar/vagas")
    public ResponseEntity<?> carregarDashboardVagas() {
        try {

            List<String> listaDeCadastros = vagasDAO.listaDeCadastrosVagas();

            return ResponseEntity.ok().body(listaDeCadastros);

        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @ResponseBody
    @RequestMapping(method = RequestMethod.GET, value = "/carregar/clientes")
    public ResponseEntity<?> carregarDashboardCliente() {
        try {

            List<String> listaDeCadastros = clientesDAO.listaDeCadastrosClientes();

            return ResponseEntity.ok().body(listaDeCadastros);

        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @ResponseBody
    @RequestMapping(method = RequestMethod.GET, value = "/carregar/funcionarios")
    public ResponseEntity<?> carregarDashboardFuncionarios() {
        try {

            List<String> listaDeCadastros = usuarioDAO.listaDeCadastrosUsuario();

            return ResponseEntity.ok().body(listaDeCadastros);

        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

}