package com.projeto.portfolio.projeto_portfolio.controller;

import java.util.List;

import com.projeto.portfolio.projeto_portfolio.entidades.Candidatos;
import com.projeto.portfolio.projeto_portfolio.entidades.DataCadastro;
import com.projeto.portfolio.projeto_portfolio.interfacesdao.InterfaceCandidatoDAO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/candidatos")
public class ControllerCandidatos {

     @Autowired
     private InterfaceCandidatoDAO candidatosDAO;

     @ResponseBody
     @RequestMapping(method = RequestMethod.GET, value = "/carregar")
     public ResponseEntity<?> carregar() {

          try {
               List<Candidatos> listaCandidatos = candidatosDAO.findAll();

               return ResponseEntity.ok().body(listaCandidatos);
          } catch (Exception e) {
               return ResponseEntity.ok()
                         .body("Erro ao carregar lista de candidatos, consultar administrador de sistema.");
          }
     }

     @ResponseBody
     @RequestMapping(method = RequestMethod.POST, value = "/cadastrar", consumes = "application/json")
     public ResponseEntity<?> cadastrarCandidato(@RequestBody Candidatos candidatos) {
          try {

               Candidatos candidato = candidatosDAO.buscarCandidatoPorCpf(candidatos.getCpf());

               if (candidato == null) {
                    DataCadastro dataCadatro = new DataCadastro();
                    candidatos.setDataCadastro(dataCadatro.getData());

                    candidatosDAO.save(candidatos);
                    
                    return ResponseEntity.ok().body("Cadastro de " + candidatos.getNome() + " finalizado com sucesso.");
               } else {
                    return candidatosDAO.findById(candidato.getId()).map(candidatoFiltrado -> {
                         candidatoFiltrado.setNome(candidatos.getNome());
                         candidatoFiltrado.setRua(candidatos.getRua());
                         candidatoFiltrado.setNumero(candidatos.getNumero());
                         candidatoFiltrado.setBairro(candidatos.getBairro());
                         candidatoFiltrado.setCidade(candidatos.getCidade());
                         candidatoFiltrado.setPais(candidatos.getPais());
                         candidatoFiltrado.setCpf(candidatos.getCpf());
                         candidatoFiltrado.setTelefone1(candidatos.getTelefone1());
                         candidatoFiltrado.setTelefoneAuxiliar(candidatos.getTelefone1());

                         Candidatos candidatoAtualizado = candidatosDAO.save(candidatoFiltrado);

                         return ResponseEntity.ok()
                                   .body("Cadastro de " + candidatoAtualizado.getNome() + " atualizado com sucesso.");
                    }).orElse(ResponseEntity.ok()
                              .body("Erro ao atualizar cadastro de candidato, consultar administrador de sistema."));

               }

          } catch (Exception e) {
               return ResponseEntity.ok().body("Erro interno, consultar administrador do sistema.");
          }
     }

     @ResponseBody
     @RequestMapping(method = RequestMethod.GET, value = "/buscar/framento/{informacao}")
     public ResponseEntity<?> buscarPorFramento(@PathVariable("informacao") String informacao) {

          try {

               List<Candidatos> listaCandidatos = candidatosDAO.buscarCandidatosPorFragmento(informacao);

               return ResponseEntity.ok().body(listaCandidatos);
          } catch (Exception e) {
               return ResponseEntity.ok()
                         .body("Erro ao carregar lista de candidatos, consultar administrador de sistema.");
          }
     }

     @ResponseBody
     @RequestMapping(method = RequestMethod.GET, value = "/buscar/id/{id}")
     public ResponseEntity<?> buscarPorId(@PathVariable("id") Long id) {

          try {

               Candidatos candidato = candidatosDAO.buscarCandidatoPorId(id);

               return ResponseEntity.ok().body(candidato);
          } catch (Exception e) {
               return ResponseEntity.ok().body(
                         "Erro ao carregar cadastro de candidato selecionado, consultar administrador de sistema.");
          }
     }

     @ResponseBody
     @RequestMapping(method = RequestMethod.DELETE, value = "/deletar/id/{id}")
     public ResponseEntity<?> deletar(@PathVariable("id") Long id) {

          try {

               return candidatosDAO.findById(id).map(candidato -> {
                    candidatosDAO.delete(candidato);
                    return ResponseEntity.ok().body("Cadastro de " + candidato.getNome() + " excluido com sucesso.");
               }).orElse(ResponseEntity.ok().body(
                         "Erro ao excluir cadastro de candidato selecionado, consultar administrador de sistema."));
          } catch (Exception e) {
               return ResponseEntity.ok().body(
                         "Erro ao excluir cadastro de candidato selecionado, consultar administrador de sistema.");
          }
     }

}