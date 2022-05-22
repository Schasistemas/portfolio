package com.projeto.portfolio.projeto_portfolio.interfacesdao;

import java.util.List;

import com.projeto.portfolio.projeto_portfolio.entidades.Vagas;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface InterfaceVagaDAO extends JpaRepository<Vagas, Long> {
    
    @Query("SELECT u FROM Vagas u WHERE u.nome LIKE CONCAT('%',:informacao,'%')")
     List<Vagas> buscarVagaPorFragmento(@Param("informacao") String informacao);

     @Query("SELECT u FROM Vagas u WHERE u.id= :id ")
     Vagas buscarCandidatoPorId(@Param("id") Long id);

     @Query("SELECT u FROM Vagas u WHERE u.nome= :nomeInformado ")
     Vagas buscarVagasPorNome(@Param("nomeInformado") String nomeVaga);

     @Query("select count(id) from Vagas group by dataCadastro order by dataCadastro ")
     List<String> listaDeCadastrosVagas();

}
