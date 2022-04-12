package com.projeto.portfolio.projeto_portfolio.controller;

import java.util.ArrayList;
import java.util.List;

import com.projeto.portfolio.projeto_portfolio.entidades.Candidatos;
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
     public ResponseEntity<?> carregar(){

          try {
               List<Candidatos> listaCandidatos = new ArrayList();

               listaCandidatos = candidatosDAO.findAll();

               return ResponseEntity.ok().body(listaCandidatos);
          } catch (Exception e) {
               return ResponseEntity.ok().body("Erro ao carregar lista de candidatos, consultar administrador de sistema.");
          }
     }

     @ResponseBody
     @RequestMapping(method = RequestMethod.POST, value = "/cadastrar", consumes = "application/json")
     public ResponseEntity<?> cadastrarCandidato(@RequestBody Candidatos candidatos){
          try {
               candidatosDAO.save(candidatos);
               return ResponseEntity.ok().body("Cadastro de "+candidatos.getNome()+" finalizado com sucesso.");
          } catch (Exception e) {
               return ResponseEntity.ok().body("Erro interno, consultar administrador do sistema.");
          }
     }

     @ResponseBody
     @RequestMapping(method = RequestMethod.GET, value = "/buscar/framento/{informacao}")
     public ResponseEntity<?> buscarPorFramento(@PathVariable("informacao") String informacao){

          try {

               System.out.println(informacao);

               List<Candidatos> listaCandidatos = new ArrayList();

               listaCandidatos = candidatosDAO.buscarCandidatosPorFragmento(informacao);

               return ResponseEntity.ok().body(listaCandidatos);
          } catch (Exception e) {
               return ResponseEntity.ok().body("Erro ao carregar lista de candidatos, consultar administrador de sistema.");
          }
     }

     @ResponseBody
     @RequestMapping(method = RequestMethod.GET, value = "/buscar/id/{id}")
     public ResponseEntity<?> buscarPorId(@PathVariable("id") Long id){

          try {

               Candidatos candidato = candidatosDAO.buscarCandidatoPorId(id);

               return ResponseEntity.ok().body(candidato);
          } catch (Exception e) {
               return ResponseEntity.ok().body("Erro ao carregar cadastro de candidato selecionado, consultar administrador de sistema.");
          }
     }

     @ResponseBody
     @RequestMapping(method = RequestMethod.DELETE, value = "/deletar/id/{id}")
     public ResponseEntity<?> deletar(@PathVariable("id") Long id){

          try {

               return candidatosDAO.findById(id).map(candidato -> {
                    candidatosDAO.delete(candidato);
                  return ResponseEntity.ok().body("Cadastro de "+candidato.getNome()+" excluido com sucesso.");
               }).orElse(ResponseEntity.ok().body("Erro ao excluir cadastro de candidato selecionado, consultar administrador de sistema."));
          } catch (Exception e) {
               return ResponseEntity.ok().body("Erro ao excluir cadastro de candidato selecionado, consultar administrador de sistema.");
          }
     }

}