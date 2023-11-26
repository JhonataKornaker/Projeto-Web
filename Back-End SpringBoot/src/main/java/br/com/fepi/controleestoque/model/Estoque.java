package br.com.fepi.controleestoque.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "estoque")
@Getter
@Setter
public class Estoque {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private int quantidade;
    private String local;
    private String categoria;

    public Estoque() {
    }
    public Estoque(Long id, String nome, int quantidade, String local, String categoria) {
        this.id = id;
        this.nome = nome;
        this.quantidade = quantidade;
        this.local = local;
        this.categoria = categoria;
    }


}
