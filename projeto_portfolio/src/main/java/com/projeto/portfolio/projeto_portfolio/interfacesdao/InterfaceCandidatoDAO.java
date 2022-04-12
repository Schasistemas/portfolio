package com.projeto.portfolio.projeto_portfolio.interfacesdao;

import java.util.List;

import com.projeto.portfolio.projeto_portfolio.entidades.Candidatos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface InterfaceCandidatoDAO extends JpaRepository<Candidatos, Long>{
     
     @Query("SELECT u FROM Candidatos u WHERE u.nome LIKE CONCAT('%',:informacao,'%') OR u.cpf LIKE CONCAT('%',:informacao,'%')")
     List<Candidatos> buscarCandidatosPorFragmento(@Param("informacao") String informacao);

     @Query("SELECT u FROM Candidatos u WHERE u.id= :id ")
     Candidatos buscarCandidatoPorId(@Param("id") Long id);

}
