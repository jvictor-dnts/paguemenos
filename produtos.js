// ===============================
// CARREGAR PRODUTOS
// ===============================

const produtosPadrao = [
  { id: 1, nome: "Açúcar Alegre", categoria: "Mercearia", custo: 0.00, venda: 0.00 },
  { id: 2, nome: "Açúcar Nectar", categoria: "Mercearia", custo: 0.00, venda: 0.00 },
  { id: 3, nome: "Alface", categoria: "Hortifruti", custo: 0.00, venda: 0.00 },
  { id: 4, nome: "Arroz Catarinão", categoria: "Mercearia", custo: 0.00, venda: 0.00 },
  { id: 5, nome: "Arroz Parb Realengo", categoria: "Mercearia", custo: 0.00, venda: 0.00 },
  { id: 6, nome: "Arroz São Joaquim", categoria: "Mercearia", custo: 0.00, venda: 0.00 },
  { id: 7, nome: "Água Sanitária Clorito 1L", categoria: "Limpeza", custo: 0.00, venda: 0.00 },
  { id: 8, nome: "Água Sanitária Olimpo 1L", categoria: "Limpeza", custo: 0.00, venda: 0.00 },
  { id: 9, nome: "Bolo Jucurutu Manteiga do Sertão", categoria: "Mercearia", custo: 0.00, venda: 0.00 },
  { id: 10, nome: "Café Kimimo", categoria: "Mercearia", custo: 0.00, venda: 0.00 },
  { id: 11, nome: "Cream Cracker Estrela", categoria: "Mercearia", custo: 0.00, venda: 0.00 },
  { id: 12, nome: "Creme Dental Colgate MPA", categoria: "Limpeza", custo: 0.00, venda: 0.00 },
  { id: 13, nome: "Detergente", categoria: "Limpeza", custo: 0.00, venda: 0.00 },
  { id: 14, nome: "Detergente Limpol", categoria: "Limpeza", custo: 0.00, venda: 0.00 },
  { id: 15, nome: "Farinha de Trigo Finna s/ Fermento", categoria: "Mercearia", custo: 0.00, venda: 0.00 },
  { id: 16, nome: "Feijão Carioca", categoria: "Mercearia", custo: 0.00, venda: 0.00 },
  { id: 17, nome: "Feijão Preto Grão da Hora", categoria: "Mercearia", custo: 0.00, venda: 0.00 },
  { id: 18, nome: "Flocos de Milho Flokão", categoria: "Mercearia", custo: 0.00, venda: 0.00 },
  { id: 19, nome: "Flocos de Milho Fortemilho", categoria: "Mercearia", custo: 0.00, venda: 0.00 },
  { id: 20, nome: "Lava Roupas Limpa Mil 3L", categoria: "Limpeza", custo: 0.00, venda: 0.00 },
  { id: 21, nome: "Limpa Alumínio Limpa Mil 500ml", categoria: "Limpeza", custo: 0.00, venda: 0.00 },
  { id: 22, nome: "Macarrão Aliança 400g", categoria: "Mercearia", custo: 0.00, venda: 0.00 },
  { id: 23, nome: "Macarrão Bonsabor 400g", categoria: "Mercearia", custo: 0.00, venda: 0.00 },
  { id: 24, nome: "Manteiga da Terra", categoria: "Mercearia", custo: 0.00, venda: 0.00 },
  { id: 25, nome: "Milho Verde Fugini", categoria: "Mercearia", custo: 0.00, venda: 0.00 },
  { id: 26, nome: "Multiuso Uau", categoria: "Limpeza", custo: 0.00, venda: 0.00 },
  { id: 27, nome: "Refrigerante Guaraná 2L", categoria: "Bebidas", custo: 0.00, venda: 0.00 },
  { id: 28, nome: "Sabão em Pó Absoluto 400g", categoria: "Limpeza", custo: 0.00, venda: 0.00 },
  { id: 29, nome: "Coca Cola 2L", categoria: "Bebidas", custo: 0.00, venda: 0.00 },
  { id: 30, nome: "Sprite 2L", categoria: "Bebidas", custo: 0.00, venda: 0.00 },
  { id: 31, nome: "Nescau Prontinho", categoria: "Bebidas", custo: 0.00, venda: 0.00 },
  { id: 32, nome: "Batatinha KG", categoria: "Hortifruti", custo: 0.00, venda: 0.00 },
  { id: 33, nome: "Batata Doce KG ", categoria: "Hortifruti", custo: 0.00, venda: 0.00 },
  { id: 34, nome: "Tomate KG", categoria: "Hortifruti", custo: 0.00, venda: 0.00 },
  { id: 35, nome: "Alho KG", categoria: "Hortifruti", custo: 0.00, venda: 0.00 },
  { id: 36, nome: "Cenoura KG", categoria: "Hortifruti", custo: 0.00, venda: 0.00 },
  { id: 37, nome: "Cebola KG", categoria: "Hortifruti", custo: 0.00, venda: 0.00 },
  { id: 38, nome: "Maracujá KG", categoria: "Hortifruti", custo: 0.00, venda: 0.00 },
];

let produtos = JSON.parse(localStorage.getItem("produtos")) || produtosPadrao;

function salvarProdutos() {
  localStorage.setItem("produtos", JSON.stringify(produtos));
}

const listaProdutos = document.getElementById("listaProdutos");
const filtroCategoria = document.getElementById("filtroCategoria");

// ===============================
// CÁLCULOS
// ===============================

function calcularLucro(custo, venda) {
  return venda - custo;
}

function calcularMargem(custo, venda) {
  if (venda === 0) return 0;
  return ((venda - custo) / venda) * 100;
}

// ===============================
// ALTERAÇÃO POR BOTÃO
// ===============================

function alterarValor(id, campo, incremento) {
  const produto = produtos.find(p => p.id === id);
  if (!produto) return;

  produto[campo] += incremento;
  if (produto[campo] < 0) produto[campo] = 0;

  salvarProdutos();
  renderizarProdutos();
}

function alterarMargem(id, incremento) {
  const produto = produtos.find(p => p.id === id);
  if (!produto) return;

  let margemAtual = calcularMargem(produto.custo, produto.venda);
  margemAtual += incremento;

  if (margemAtual >= 0 && margemAtual < 100) {
    produto.venda = produto.custo / (1 - margemAtual / 100);
  }

  salvarProdutos();
  renderizarProdutos();
}

// ===============================
// ALTERAÇÃO DIGITANDO
// ===============================

function editarValor(id, campo, valor) {
  const produto = produtos.find(p => p.id === id);
  if (!produto) return;

  valor = parseFloat(valor);
  if (isNaN(valor) || valor < 0) return;

  produto[campo] = valor;

  salvarProdutos();
  renderizarProdutos();
}

function editarMargemDireto(id, novaMargem) {
  const produto = produtos.find(p => p.id === id);
  if (!produto) return;

  novaMargem = parseFloat(novaMargem);

  if (isNaN(novaMargem) || novaMargem < 0 || novaMargem >= 100) return;

  produto.venda = produto.custo / (1 - novaMargem / 100);

  salvarProdutos();
  renderizarProdutos();
}

// ===============================
// RENDERIZAÇÃO
// ===============================

function renderizarProdutos() {

  listaProdutos.innerHTML = "";

  const categoriaSelecionada = filtroCategoria.value;

  const filtrados = categoriaSelecionada === "Todos"
    ? produtos
    : produtos.filter(p => p.categoria === categoriaSelecionada);

  filtrados.forEach(produto => {

    const lucro = calcularLucro(produto.custo, produto.venda);
    const margem = calcularMargem(produto.custo, produto.venda);
    const classeLucro = lucro >= 0 ? "lucro-positivo" : "lucro-negativo";

    const card = document.createElement("div");
    card.classList.add("produto-card");

    card.innerHTML = `
      <h3>${produto.nome}</h3>

      <label>Custo</label>
      <div class="input-control">
        <button onclick="alterarValor(${produto.id}, 'custo', -0.10)">−</button>
        <input type="number" step="0.01"
          value="${produto.custo.toFixed(2)}"
          onchange="editarValor(${produto.id}, 'custo', this.value)">
        <button onclick="alterarValor(${produto.id}, 'custo', 0.10)">+</button>
      </div>

      <label>Margem (%)</label>
      <div class="input-control">
        <button onclick="alterarMargem(${produto.id}, -1)">−</button>
        <input type="number" step="0.1"
          value="${margem.toFixed(1)}"
          onchange="editarMargemDireto(${produto.id}, this.value)">
        <button onclick="alterarMargem(${produto.id}, 1)">+</button>
      </div>

      <label>Venda</label>
      <div class="input-control">
        <button onclick="alterarValor(${produto.id}, 'venda', -0.10)">−</button>
        <input type="number" step="0.01"
          value="${produto.venda.toFixed(2)}"
          onchange="editarValor(${produto.id}, 'venda', this.value)">
        <button onclick="alterarValor(${produto.id}, 'venda', 0.10)">+</button>
      </div>

      <div class="profit ${classeLucro}">
        Lucro: R$ ${lucro.toFixed(2)}
      </div>

      <button class="btn btn-primary" onclick="adicionarPromocao(${produto.id})">
        Enviar para Promoção
      </button>
    `;

    listaProdutos.appendChild(card);
  });
}

// ===============================
// PROMOÇÃO
// ===============================

function adicionarPromocao(id) {
  const produto = produtos.find(p => p.id === id);
  if (!produto) return;

  localStorage.setItem("produtoPromocao", JSON.stringify(produto));
  window.location.href = "index.html";
}

// ===============================
// EVENTOS
// ===============================

filtroCategoria.addEventListener("change", renderizarProdutos);
renderizarProdutos();