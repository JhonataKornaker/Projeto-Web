package br.com.fepi.controleestoque.controller;

import br.com.fepi.controleestoque.model.Estoque;
import br.com.fepi.controleestoque.repository.EstoqueRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/estoque")
@CrossOrigin(origins = {"http://127.0.0.1:5500", "http://127.0.0.1:5501"})
public class EstoqueController {

    @Autowired
    EstoqueRepository repository;

    @PostMapping
    public ResponseEntity<String> cadastrarEstoque(@RequestBody Estoque estoque){
        repository.save(estoque);
        return ResponseEntity.ok("{\"mensagem\": \"Cadastro com sucesso!\"}");
    }
    @GetMapping
    public List<Estoque> listarEstoque() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Estoque> buscarPorId(@PathVariable Long id) {
        Optional<Estoque> estoque = repository.findById(id);
        /*Se o Optional estoque contiver um objeto Estoque, ele será mapeado para uma resposta e retorna o conteudo.
          Se o Optional estoque estiver vazio, dará um erro.*/
        return estoque.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Map<String, String>> atualizarEstoque(@PathVariable Long id, @RequestBody Estoque novoEstoque) {
        Optional<Estoque> estoqueExistente = repository.findById(id);

        if (estoqueExistente.isPresent()) {
            Estoque estoque = estoqueExistente.get();
            estoque.setNome(novoEstoque.getNome());
            estoque.setQuantidade(novoEstoque.getQuantidade());
            estoque.setLocal(novoEstoque.getLocal());
            estoque.setCategoria(novoEstoque.getCategoria());
            repository.save(estoque);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Estoque atualizado com sucesso!");
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    /*@PutMapping("/{id}")
    public ResponseEntity<String> atualizarEstoque(@PathVariable Long id, @RequestBody Estoque novoEstoque) {
        Optional<Estoque> estoqueExistente = repository.findById(id);

        if (estoqueExistente.isPresent()) {
            Estoque estoque = estoqueExistente.get();
            estoque.setNome(novoEstoque.getNome());
            estoque.setQuantidade(novoEstoque.getQuantidade());
            repository.save(estoque);
            return ResponseEntity.ok("Estoque atualizado com sucesso!");
        } else {
            return ResponseEntity.notFound().build();
        }
    }*/

   /* @DeleteMapping("/{id}")
    public ResponseEntity<String> excluirEstoque(@PathVariable Long id) {
        Optional<Estoque> estoque = repository.findById(id);

        if (estoque.isPresent()) {
            repository.deleteById(id);
            return ResponseEntity.ok("Estoque excluído com sucesso!");
        } else {
            return ResponseEntity.notFound().build();
        }
    }*/
   @DeleteMapping("/{id}")
   public ResponseEntity<Map<String, String>> excluirEstoque(@PathVariable Long id) {
       Optional<Estoque> estoque = repository.findById(id);

       if (estoque.isPresent()) {
           repository.deleteById(id);

           /* Para um objeto JSON, você precisa passar um objeto para ResponseEntity.ok(). Este objeto será então convertido em JSON.
           Map ou um objeto de uma classe personalizada (como ResponseMessage no exemplo anterior),
           o Spring irá automaticamente converter este objeto em JSON.*/

           Map<String, String> response = new HashMap<>();
           response.put("message", "Estoque excluído com sucesso!");
           return ResponseEntity.ok(response);
       } else {
           return ResponseEntity.notFound().build();
       }
   }
}
