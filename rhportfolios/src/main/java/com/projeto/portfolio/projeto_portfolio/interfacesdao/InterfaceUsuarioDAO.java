package com.projeto.portfolio.projeto_portfolio.interfacesdao;

import java.util.List;

import com.projeto.portfolio.projeto_portfolio.entidades.Usuario;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface InterfaceUsuarioDAO extends JpaRepository<Usuario, Long> {

    @Query("SELECT u FROM Usuario u WHERE u.nome LIKE CONCAT('%',:informacao,'%') ")
    List<Usuario> buscarCandidatosPorFragmento(@Param("informacao") String informacao);

    @Query("SELECT u FROM Usuario u WHERE u.id= :id ")
    Usuario buscarUsuarioPorId(@Param("id") Long id);

    @Query("SELECT u FROM Usuario u WHERE u.cpf= :cpf ")
    Usuario buscarUsuarioPorCpf(@Param("cpf") String cpf);

    @Query("select count(id) from Usuario group by dataCadastro order by dataCadastro ")
    List<String> listaDeCadastrosUsuario();

    @Query("SELECT u FROM Usuario u WHERE u.username= :username ")
    Usuario buscarUsuarioPorUsername(@Param("username") String username);

    @Query("SELECT u FROM Usuario u WHERE u.email= :email ")
    Usuario buscarUsuarioPorEmail(@Param("email") String email);

    @Query("SELECT u FROM Usuario u WHERE u.token= :token ")
    Usuario buscarUsuarioPorToke(@Param("token") String token);

    @Query("SELECT u FROM Usuario u WHERE u.nome= :nome ")
    Usuario buscarUsuarioPorNome(@Param("nome") String nome);

}
