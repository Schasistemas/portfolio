package com.projeto.portfolio.projeto_portfolio.controller;

import java.util.List;

import com.projeto.portfolio.projeto_portfolio.entidades.Clientes;
import com.projeto.portfolio.projeto_portfolio.entidades.DataCadastro;
import com.projeto.portfolio.projeto_portfolio.interfacesdao.InterfaceClientes;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/clientes")
public class ControllerClientes {

    @Autowired
    private InterfaceClientes clienteDAO;

    @ResponseBody
    @RequestMapping(method = RequestMethod.POST, value = "/cadastrar", consumes = "application/json")
    public ResponseEntity<?> cadastrarCandidato(@RequestBody Clientes cliente) {
        try {

            Clientes client = clienteDAO.buscarCandidatoPorCpf(cliente.getCnpj());

            if (client == null) {

                DataCadastro dataCadastro = new DataCadastro();
                cliente.setDataCadastro(dataCadastro.getData());

                clienteDAO.save(cliente);

                return ResponseEntity.ok().body("Cadastro de " + cliente.getNome() + " finalizado com sucesso.");
            } else {
                return clienteDAO.findById(client.getId()).map(clienteFiltrado -> {
                    clienteFiltrado.setNome(cliente.getNome());
                    clienteFiltrado.setAtuacao(cliente.getAtuacao());
                    clienteFiltrado.setRua(cliente.getRua());
                    clienteFiltrado.setBairro(cliente.getBairro());
                    clienteFiltrado.setCidade(cliente.getCidade());
                    clienteFiltrado.setEstado(cliente.getEstado());
                    clienteFiltrado.setPais(cliente.getPais());
                    clienteFiltrado.setPais(cliente.getTelefone1());
                    clienteFiltrado.setTelefone2(cliente.getTelefone2());

                    Clientes clienteAtualizado = clienteDAO.save(clienteFiltrado);

                    return ResponseEntity.ok()
                            .body("Cadastro de " + clienteAtualizado.getNome() + " atualizado com sucesso.");
                }).orElse(ResponseEntity.ok()
                        .body("Erro ao atualizar cadastro de cliente, consultar administrador de sistema."));

            }

        } catch (Exception e) {
            return ResponseEntity.ok().body("Erro interno, consultar administrador do sistema.");
        }
    }

    @ResponseBody
    @RequestMapping(method = RequestMethod.GET, value = "/buscar/framento/{informacao}")
    public ResponseEntity<?> buscarPorFramento(@PathVariable("informacao") String informacao) {

        try {

            List<Clientes> listaClientes = clienteDAO.buscarCandidatosPorFragmento(informacao);

            return ResponseEntity.ok().body(listaClientes);
        } catch (Exception e) {
            return ResponseEntity.ok()
                    .body("Erro ao carregar lista de clientes, consultar administrador de sistema.");
        }
    }

    @ResponseBody
    @RequestMapping(method = RequestMethod.GET, value = "/buscar/id/{id}")
    public ResponseEntity<?> buscarPorId(@PathVariable("id") Long id) {

        try {

            Clientes cliente = clienteDAO.buscarCandidatoPorId(id);

            return ResponseEntity.ok().body(cliente);
        } catch (Exception e) {
            return ResponseEntity.ok().body(
                    "Erro ao carregar cadastro de cliente selecionado, consultar administrador de sistema.");
        }
    }

    @ResponseBody
    @RequestMapping(method = RequestMethod.DELETE, value = "/deletar/id/{id}")
    public ResponseEntity<?> deletar(@PathVariable("id") Long id) {

        try {

            return clienteDAO.findById(id).map(cliente -> {
                clienteDAO.delete(cliente);
                return ResponseEntity.ok().body("Cadastro de " + cliente.getNome() + " excluido com sucesso.");
            }).orElse(ResponseEntity.ok().body(
                    "Erro ao excluir cadastro de cliente selecionado, consultar administrador de sistema."));
        } catch (Exception e) {
            return ResponseEntity.ok().body(
                    "Erro ao excluir cadastro de cliente selecionado, consultar administrador de sistema.");
        }
    }

}
