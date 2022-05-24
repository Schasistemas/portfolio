package com.projeto.portfolio.projeto_portfolio.interfacesdao;

import java.util.List;

import com.projeto.portfolio.projeto_portfolio.entidades.Site;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface InterfaceSite extends JpaRepository<Site, Long>{
    
    @Query("SELECT u FROM Site u WHERE u.status <> 1")
    List<Site> buscarMensagensNaoLidas();

}
