package com.projeto.portfolio.projeto_portfolio.entidades;

import java.text.SimpleDateFormat;
import java.util.Date;

public class DataCadastro {

    private String data;
    private SimpleDateFormat dataCadastro;

    public DataCadastro() {
    }

    public DataCadastro(String data) {
        this.data = data;
    }

    public String getData() {
        dataCadastro = new SimpleDateFormat("dd/MM/yyyy");
        return data = dataCadastro.format(new Date());
    }

    public void setData(String data) {
        this.data = data;
    }

}
