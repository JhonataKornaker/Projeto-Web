document.getElementById('form-produto').addEventListener('submit', function (event) {
    event.preventDefault(); // Evita o envio padrão do formulário

    // Obtém os valores dos campos do formulário
    const nome = document.getElementById('nome-produto').value;
    const quantidade = document.getElementById('quantidade-produto').value;
    const local = document.getElementById('local-produto').value;
    const categoria = document.getElementById('categoria-produto').value;
    //const imagem = document.getElementById('imagem-produto').files[0]; // Seletor de arquivo

    // Constrói um objeto com os dados
    const novoEstoque = {
        nome: nome,
        quantidade: quantidade,
        local: local,
        categoria: categoria
        // Adicione outros campos conforme necessário
    };

    fetch('http://localhost:8080/estoque', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(novoEstoque)
    })
    .then(response => response.json())
    .then(dados => {
        console.log('Sucesso: ', dados)
        window.location.href = 'index.html';
    })
    .catch(error => {
        console.error('Erro: ', error)
    })
});