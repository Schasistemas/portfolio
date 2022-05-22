package com.projeto.portfolio.projeto_portfolio.controller;

import java.util.List;

import com.projeto.portfolio.projeto_portfolio.entidades.DataCadastro;
import com.projeto.portfolio.projeto_portfolio.entidades.Vagas;
import com.projeto.portfolio.projeto_portfolio.interfacesdao.InterfaceVagaDAO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/vagas")
public class ControllerVagas {

    @Autowired
    private InterfaceVagaDAO vagaDAO;

    @ResponseBody
    @RequestMapping("/cadastrar")
    public ResponseEntity<?> cadastrarVagas(@RequestBody Vagas vaga) {
        try {

            if (vaga.getId() == null) {

                DataCadastro dataCadastro = new DataCadastro();
                vaga.setDataCadastro(dataCadastro.getData());

                vagaDAO.save(vaga);
                
                return ResponseEntity.ok().body("Cadastro da vaga de " + vaga.getNome() + " finalizada com sucesso.");
            } else {
                return vagaDAO.findById(vaga.getId()).map(vagaFiltrada -> {
                    vagaFiltrada.setNome(vaga.getNome());
                    vagaFiltrada.setDescricao(vaga.getDescricao());
                    vagaFiltrada.setPricipaisAtividades(vaga.getPricipaisAtividades());
                    vagaFiltrada.setRequisitos(vaga.getRequisitos());
                    vagaFiltrada.setPerfil(vaga.getPerfil());

                    Vagas vagaAtualizada = vagaDAO.save(vagaFiltrada);

                    return ResponseEntity.ok()
                            .body("Cadastro da vaga " + vagaAtualizada.getNome() + " atualizada com sucesso.");
                }).orElse(ResponseEntity.ok().body("Erro ao armazenar informações de vaga."));   
            }

        } catch (Exception e) {
            return ResponseEntity.ok().body("Erro ao armazenar informações de vaga, comunicar ao administrador.");
        }
    }

    @ResponseBody
    @RequestMapping(method = RequestMethod.GET, value = "/buscar/framento/{informacao}")
    public ResponseEntity<?> buscarPorFramento(@PathVariable("informacao") String informacao) {

        try {

            List<Vagas> listaVagas = vagaDAO.buscarVagaPorFragmento(informacao);

            return ResponseEntity.ok().body(listaVagas);
        } catch (Exception e) {
            return ResponseEntity.ok()
                    .body("Erro ao carregar lista de vaga, consultar administrador de sistema.");
        }
    }

    @ResponseBody
    @RequestMapping(method = RequestMethod.DELETE, value = "/deletar/id/{id}")
    public ResponseEntity<?> deletar(@PathVariable("id") Long id) {

        try {

            return vagaDAO.findById(id).map(vaga -> {
                vagaDAO.delete(vaga);
                return ResponseEntity.ok().body("Cadastro de " + vaga.getNome() + " excluido com sucesso.");
            }).orElse(ResponseEntity.ok().body(
                    "Erro ao excluir cadastro de vaga selecionado, consultar administrador de sistema."));
        } catch (Exception e) {
            return ResponseEntity.ok().body(
                    "Erro ao excluir cadastro de vaga selecionado, consultar administrador de sistema.");
        }
    }

    @ResponseBody
     @RequestMapping(method = RequestMethod.GET, value = "/buscar/id/{id}")
     public ResponseEntity<?> buscarPorId(@PathVariable("id") Long id) {

          try {

               Vagas vaga = vagaDAO.buscarCandidatoPorId(id);

               return ResponseEntity.ok().body(vaga);
          } catch (Exception e) {
               return ResponseEntity.ok().body(
                         "Erro ao carregar cadastro de vaga selecionado, consultar administrador de sistema.");
          }
     }

}
