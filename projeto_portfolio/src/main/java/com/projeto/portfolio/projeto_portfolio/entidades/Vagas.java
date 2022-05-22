package com.projeto.portfolio.projeto_portfolio.entidades;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;

@Entity
@Table(name = "vagas")
public class Vagas {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    @Lob
    private String descricao;
    @Lob
    private String pricipaisAtividades;
    @Lob
    private String requisitos;
    @Lob
    private String perfil;
    private String dataCadastro;

    public String getDataCadastro() {
        return dataCadastro;
    }

    public void setDataCadastro(String dataCadastro) {
        this.dataCadastro = dataCadastro;
    }

    public Vagas() {
    }

    public Vagas(String nome, String descricao, String pricipaisAtividades, String requisitos, String perfil) {
        this.nome = nome;
        this.descricao = descricao;
        this.pricipaisAtividades = pricipaisAtividades;
        this.requisitos = requisitos;
        this.perfil = perfil;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getPricipaisAtividades() {
        return pricipaisAtividades;
    }

    public void setPricipaisAtividades(String pricipaisAtividades) {
        this.pricipaisAtividades = pricipaisAtividades;
    }

    public String getRequisitos() {
        return requisitos;
    }

    public void setRequisitos(String requisitos) {
        this.requisitos = requisitos;
    }

    public String getPerfil() {
        return perfil;
    }

    public void setPerfil(String perfil) {
        this.perfil = perfil;
    }

}
