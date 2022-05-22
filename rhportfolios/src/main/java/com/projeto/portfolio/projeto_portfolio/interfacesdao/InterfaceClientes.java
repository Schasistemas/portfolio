package com.projeto.portfolio.projeto_portfolio.interfacesdao;

import java.util.List;

import com.projeto.portfolio.projeto_portfolio.entidades.Clientes;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface InterfaceClientes extends JpaRepository<Clientes, Long>{

    @Query("SELECT u FROM Clientes u WHERE u.nome LIKE CONCAT('%',:informacao,'%') OR u.cnpj LIKE CONCAT('%',:informacao,'%')")
     List<Clientes> buscarCandidatosPorFragmento(@Param("informacao") String informacao);

     @Query("SELECT u FROM Clientes u WHERE u.id= :id ")
     Clientes buscarCandidatoPorId(@Param("id") Long id);

     @Query("SELECT u FROM Clientes u WHERE u.cnpj= :cnpjInformado ")
     Clientes buscarCandidatoPorCpf(@Param("cnpjInformado") String cpf);

     @Query("select count(id) from Clientes group by dataCadastro order by dataCadastro ")
     List<String> listaDeCadastrosClientes();
    
}
