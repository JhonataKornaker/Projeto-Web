package br.com.fepi.controleestoque.repository;

import br.com.fepi.controleestoque.model.Estoque;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EstoqueRepository extends JpaRepository<Estoque, Long> {
}
