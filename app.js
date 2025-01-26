//Hello, World!
let nomes = [];
let listaAmigos = document.getElementById('listaAmigos');
let resultado = document.getElementById('resultado');
let inputAmigo = document.getElementById('amigo');
let botaoAdicionar = document.querySelector('.button-add');

function adicionarAmigo() {
    let nome = inputAmigo.value.trim();

    if (nome === "" || !isNaN(nome)) {
        alert("Por favor, insira um nome válido (apenas texto).");
        return;
    }

    nomes.push(nome);
    inputAmigo.value = '';

    atualizarListaAmigos();
}

function atualizarListaAmigos() {
    listaAmigos.innerHTML = '';

    nomes.forEach((nome, index) => {
        let itemLista = document.createElement('li');
        itemLista.textContent = nome;

        let botaoRemover = document.createElement('button');
        botaoRemover.textContent = 'Remover';
        botaoRemover.onclick = () => removerAmigo(index);

        itemLista.appendChild(botaoRemover);
        listaAmigos.appendChild(itemLista);
    });
}

function removerAmigo(index) {
    nomes.splice(index, 1);
    atualizarListaAmigos();
}

function sortearAmigo() {
    if (nomes.length < 2) {
        alert("Adicione pelo menos dois nomes para realizar o sorteio.");
        return;
    }

    let nomesSorteados = embaralhar(nomes.slice()); 

    // Verifica se alguém tirou a si mesmo e reembaralha se necessário
    while (nomes.some((nome, index) => nome === nomesSorteados[index])) {
        nomesSorteados = embaralhar(nomes.slice());
    }

    resultado.innerHTML = '';

    nomes.forEach((nome, index) => {
        let itemResultado = document.createElement('li');
        itemResultado.textContent = `${nome} tirou ${nomesSorteados[index]}`;
        resultado.appendChild(itemResultado);
    });
}

function embaralhar(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}


/*
// Melhoria futura: Lógica para admin e participantes

let usuarioLogado = {
    tipo: 'participante', // ou 'admin'
    nome: 'Nome do Participante' // ou null para admin
};


if (usuarioLogado.tipo === 'admin') {
    // Admin tem acesso a todas as funcionalidades
} else {
    // Participante só vê o seu amigo secreto
    let amigoSecreto = nomesSorteados[nomes.indexOf(usuarioLogado.nome)];
    resultado.innerHTML = `<li>${usuarioLogado.nome} tirou ${amigoSecreto}</li>`;

    // Esconder outras partes da interface (botões, lista de nomes, etc.)
}
*/