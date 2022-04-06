package com.projeto.portfolio.projeto_portfolio.entidades;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "candidatos")
public class Candidatos {

     @Id
     @GeneratedValue(strategy = GenerationType.IDENTITY)
     private Long id;
     private String nome;
     private String rua;
     private String numero;
     private String bairro;
     private String cidade;
     private String estado;
     private String pais;
     private String cpf;
     private String telefone;
     private String telefoneAuxiliar;

     public Candidatos() {
     }

     public Candidatos(String nome, String rua, String numero, String bairro, String cidade, String estado, String pais,
               String cpf, String telefone, String telefoneAuxiliar) {
          this.nome = nome;
          this.rua = rua;
          this.numero = numero;
          this.bairro = bairro;
          this.cidade = cidade;
          this.estado = estado;
          this.pais = pais;
          this.cpf = cpf;
          this.telefone = telefone;
          this.telefoneAuxiliar = telefoneAuxiliar;
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

     public String getRua() {
          return rua;
     }

     public void setRua(String rua) {
          this.rua = rua;
     }

     public String getNumero() {
          return numero;
     }

     public void setNumero(String numero) {
          this.numero = numero;
     }

     public String getBairro() {
          return bairro;
     }

     public void setBairro(String bairro) {
          this.bairro = bairro;
     }

     public String getCidade() {
          return cidade;
     }

     public void setCidade(String cidade) {
          this.cidade = cidade;
     }

     public String getEstado() {
          return estado;
     }

     public void setEstado(String estado) {
          this.estado = estado;
     }

     public String getPais() {
          return pais;
     }

     public void setPais(String pais) {
          this.pais = pais;
     }

     public String getCpf() {
          return cpf;
     }

     public void setCpf(String cpf) {
          this.cpf = cpf;
     }

     public String getTelefone() {
          return telefone;
     }

     public void setTelefone(String telefone) {
          this.telefone = telefone;
     }

     public String getTelefoneAuxiliar() {
          return telefoneAuxiliar;
     }

     public void setTelefoneAuxiliar(String telefoneAuxiliar) {
          this.telefoneAuxiliar = telefoneAuxiliar;
     }

}
