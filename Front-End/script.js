document.addEventListener('DOMContentLoaded', function () {
    fetch('http://localhost:8080/estoque')
    .then(response => response.json())
    .then(listaDoSpringBoot => {
        const containerItens = document.getElementById('containerItens');
        containerItens.innerHTML = '';

        listaDoSpringBoot.forEach(item => {
            const novaSessao = criarSessaoParaItem(item);
            containerItens.appendChild(novaSessao);
        });
    })
    .catch(error => console.error('Erro ao obter a lista:', error));

    function criarSessaoParaItem(item) {
        const sessao = document.createElement('section');
        sessao.className = 'sessao-lista';
    
        const imagem = document.createElement('img');
        imagem.src = `./imagens/img2_padrao.png`; 
        //imagem.alt = item.nome;
    
        const sessaoListaCampo = document.createElement('div');
        sessaoListaCampo.className = 'sessao-lista-campo';
    
        const nomeInput = document.createElement('input');
        nomeInput.type = 'text';
        nomeInput.value = item.nome;
        nomeInput.readOnly = true;
    
        const quantidadeInput = document.createElement('input');
        quantidadeInput.type = 'text';
        quantidadeInput.value = item.quantidade;
        quantidadeInput.readOnly = true;
    
        const categoriaInput = document.createElement('input');
        categoriaInput.type = 'text';
        categoriaInput.value = item.categoria;
        categoriaInput.readOnly = true;
    
        const localInput = document.createElement('input');
        localInput.type = 'text';
        localInput.value = item.local;
        localInput.readOnly = true;
    
        const itemId = item.id;
        
        const editarButton = document.createElement('button');
        editarButton.id = 'editarButton';
        editarButton.dataset.itemId = itemId;
        const editarImg = document.createElement('img');
        editarImg.src = './icons/icons8-editar-24.png';
        editarImg.alt = 'Editar';
        editarButton.appendChild(editarImg);

        editarButton.addEventListener('click', atualizarDados);

        const lixeiraButton = document.createElement('button');
        lixeiraButton.id = 'lixeiraButton';
        lixeiraButton.dataset.itemId = itemId;
        const lixeiraImg = document.createElement('img');
        lixeiraImg.src = './icons/icons8-lixeira-24.png';
        lixeiraImg.alt = 'Lixeira';
        lixeiraButton.appendChild(lixeiraImg);

        lixeiraButton.addEventListener('click', confirmarExclusao);
    
        sessao.appendChild(imagem);
        sessao.appendChild(sessaoListaCampo);
        sessaoListaCampo.appendChild(nomeInput);
        sessaoListaCampo.appendChild(quantidadeInput);
        sessaoListaCampo.appendChild(categoriaInput);
        sessaoListaCampo.appendChild(localInput);
        sessao.appendChild(editarButton);
        sessao.appendChild(lixeiraButton);
    
        // Aplica estilos
        sessao.style.border = '1px solid #ccc';
    
        return sessao;
    }
})

function confirmarExclusao() {
    const confirmacao = window.confirm("Tem certeza que deseja excluir este item?");

    if (confirmacao) {
        const itemId = obterIdDoItem(this);
        excluirItem(itemId);
    } else {
        console.log("Exclusão cancelada pelo usuário.");
    }
}

function excluirItem(itemId) {
    //const itemId = obterIdDoItem();

    fetch(`http://localhost:8080/estoque/${itemId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro na solicitação DELETE');
        }
        return response.json();
    })
    .then(data => {
        console.log('Sucesso:', data);
        window.location.reload();
    })
    .catch(error => {
        console.error('Erro:', error);
    
    });
}
    
 function atualizarDados() {
    
    const itemId = obterIdDoItem(this);

    // Faça uma solicitação GET para obter os detalhes do item
    fetch(`http://localhost:8080/estoque/${itemId}`)
        .then(response => response.json())
        .then(item => {
            // Preencha os campos do formulário com os valores atuais do item
            document.getElementById('nome-produto').value = item.nome;
            document.getElementById('quantidade-produto').value = item.quantidade;
            document.getElementById('local-produto').value = item.local;
            document.getElementById('categoria-produto').value = item.categoria;

            // Abra o modal
            abrirModal();
        })
        .catch(error => console.error('Erro:', error));

    // Quando o formulário de edição é enviado
    document.getElementById('edit-form').addEventListener('submit', function(event) {
        event.preventDefault(); // Evita o envio padrão do formulário

        // Obtenha os valores atualizados dos campos do formulário
        const nome = document.getElementById('nome-produto').value;
        const quantidade = document.getElementById('quantidade-produto').value;
        const local = document.getElementById('local-produto').value;
        const categoria = document.getElementById('categoria-produto').value;


        const estoqueAtualizado = {
            nome: nome,
            quantidade: quantidade,
            local: local,
            categoria: categoria
        };

        // Faça uma solicitação PUT para atualizar o item
        fetch(`http://localhost:8080/estoque/${itemId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(estoqueAtualizado)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na solicitação PUT');
            }
            return response.json();
        })
        .then(data => {
            console.log('Sucesso:', data);
            window.location.reload();
        })
        .catch(error => {
            console.error('Erro:', error);
        });
    });
}

function abrirModal() {
    // Obtenha o modal
    var modal = document.querySelector(".modal");

    // Exiba o modal
    modal.style.display = "block";

    // Obtenha o elemento <span> que fecha o modal
    var span = document.getElementsByClassName("close")[0];

    // Quando o usuário clica em <span> (x), fecha o modal
    span.onclick = function() {
        modal.style.display = "none";
    }

    // Quando o usuário clica fora do modal, fecha ele
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

function obterIdDoItem(botao) {
    // Obtenha o ID do atributo de dados do botão
    const itemId = botao.dataset.itemId;

    return itemId;
}