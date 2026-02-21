const costInput = document.getElementById("costPrice");
const marginInput = document.getElementById("margin");
const saleInput = document.getElementById("salePrice");
const profitSpan = document.getElementById("profit");
const promoList = document.getElementById("promoList");
const totalItems = document.getElementById("totalItems");

document.getElementById("date").innerText =
  new Date().toLocaleDateString("pt-BR");

// ===============================
// CARREGAR ENCARTE DO LOCALSTORAGE
// ===============================

let encarte = JSON.parse(localStorage.getItem("encarte")) || [];

// ===============================
// FUNÇÕES DE CÁLCULO
// ===============================

costInput.addEventListener("input", calculateSale);
marginInput.addEventListener("input", calculateSale);
saleInput.addEventListener("input", calculateMargin);

function calculateSale() {
  const cost = parseFloat(costInput.value);
  const margin = parseFloat(marginInput.value);

  if (!isNaN(cost) && !isNaN(margin) && margin < 100) {
    const sale = cost / (1 - margin / 100);
    saleInput.value = sale.toFixed(2);
    updateProfit();
  }
}

function calculateMargin() {
  const cost = parseFloat(costInput.value);
  const sale = parseFloat(saleInput.value);

  if (!isNaN(cost) && !isNaN(sale) && sale !== 0) {
    const margin = ((sale - cost) / sale) * 100;
    marginInput.value = margin.toFixed(1);
    updateProfit();
  }
}

function updateProfit() {
  const cost = parseFloat(costInput.value);
  const sale = parseFloat(saleInput.value);
  const profit = sale - cost;

  profitSpan.innerText =
    isNaN(profit) ? "0.00" : profit.toFixed(2);
}

// ===============================
// RENDERIZAR ENCARTE
// ===============================

function renderEncarte() {
  promoList.innerHTML = "";

  encarte.forEach((item, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${item.nome}</td>
      <td>${item.categoria}</td>
      <td>R$ ${item.venda.toFixed(2).replace('.', ',')}</td>
      <td class="no-print">
        <button onclick="removerItem(${index})">🗑</button>
      </td>
    `;

    promoList.appendChild(row);
  });

  updateTotal();
}

function salvarEncarte() {
  localStorage.setItem("encarte", JSON.stringify(encarte));
}

function removerItem(index) {
  encarte.splice(index, 1);
  salvarEncarte();
  renderEncarte();
}

// ===============================
// ADICIONAR ITEM MANUAL
// ===============================

function addItem() {
  const name = document.getElementById("name").value;
  const category = document.getElementById("category").value;
  const sale = parseFloat(saleInput.value);
  const cost = parseFloat(costInput.value);

  if (!name || isNaN(sale) || sale <= 0) return;

  const novoItem = {
    nome: name,
    categoria: category,
    custo: cost || 0,
    venda: sale
  };

  encarte.push(novoItem);
  salvarEncarte();
  renderEncarte();
  clearForm();
}

// ===============================
// LIMPAR LISTA
// ===============================

function clearList() {
  if (confirm("Deseja limpar toda a lista?")) {
    encarte = [];
    salvarEncarte();
    renderEncarte();
  }
}

function updateTotal() {
  totalItems.innerText = encarte.length;
}

function clearForm() {
  document.getElementById("name").value = "";
  costInput.value = "";
  saleInput.value = "";
  marginInput.value = "";
  profitSpan.innerText = "0.00";
}

// ===============================
// RECEBER PRODUTO DA PÁGINA PRODUTOS
// ===============================

window.addEventListener("load", function () {

  const produto = JSON.parse(localStorage.getItem("produtoPromocao"));

  if (produto) {

    encarte.push(produto);
    salvarEncarte();
    localStorage.removeItem("produtoPromocao");
  }

  renderEncarte();
});