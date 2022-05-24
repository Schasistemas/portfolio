package com.projeto.portfolio.projeto_portfolio.controller;

import java.util.List;

import com.projeto.portfolio.projeto_portfolio.entidades.DataCadastro;
import com.projeto.portfolio.projeto_portfolio.entidades.Site;
import com.projeto.portfolio.projeto_portfolio.interfacesdao.InterfaceSite;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/site")
public class ControllerSite {

    @Autowired
    private InterfaceSite siteDAO;

    @ResponseBody
    @RequestMapping(method = RequestMethod.POST, value = "/mensagem", consumes = "application/json")
    public ResponseEntity<?> salvarMensagem(@RequestBody Site site) {
        try {

            DataCadastro dataMensagem = new DataCadastro();

            site.setData(dataMensagem.getData());
            site.setStatus(0);

            siteDAO.save(site);
            
            return ResponseEntity.ok()
                    .body(site.getNome() + ", sua mensagem foi recebida Obrigado.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @ResponseBody
    @RequestMapping(method = RequestMethod.GET, value = "/buscar")
    public ResponseEntity<?> buscarMensagem() {
        try {

            List<Site> listaDeMensagens = siteDAO.findAll();
        
            return ResponseEntity.ok().body(listaDeMensagens);

        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @ResponseBody
    @RequestMapping(method = RequestMethod.GET, value = "/buscar/mensagem")
    public ResponseEntity<?> buscarMensagemLidas() {
        try {

            List<Site> listaDeMensagens = siteDAO.buscarMensagensNaoLidas();
        
            return ResponseEntity.ok().body(listaDeMensagens);

        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @ResponseBody
    @RequestMapping(method = RequestMethod.PUT, value = "/atualizar/status/{id}")
    public ResponseEntity<?> atualizarStatus(@PathVariable("id") Long id){

        return siteDAO.findById(id).map(mensagem -> {
            mensagem.setNome(mensagem.getNome());
            mensagem.setEmail(mensagem.getEmail());
            mensagem.setTexto(mensagem.getTexto());
            mensagem.setData(mensagem.getData());
            mensagem.setStatus(1);

            siteDAO.save(mensagem);

            return ResponseEntity.ok().body("");
        }).orElse(ResponseEntity.ok().body(""));

    }

}
