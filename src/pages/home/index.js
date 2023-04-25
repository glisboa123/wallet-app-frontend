const onLogout = () => {
  localStorage.clear();
  window.open("../../../index.html", "_self");
};

const onDeleteItem = async (id) => {
  try {
    const email = localStorage.getItem("@WalletApp:userEmail");
    await fetch(`https://mp-wallet-app-api.herokuapp.com/finances/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        email: email,
      },
    });
    onLoadFinancesData();
  } catch (error) {
    alert("Erro ao deletar item.");
  }
};

const renderFinanceList = (data) => {
  const table = document.getElementById("finances-table");
  table.innerHTML = "";

  const tableHeader = document.createElement("tr");

  const titleText = document.createTextNode("Título");
  const titleElement = document.createElement("th");
  titleElement.className = "center";
  titleElement.appendChild(titleText);
  tableHeader.appendChild(titleElement);

  const categoryText = document.createTextNode("Categoria");
  const categoryElement = document.createElement("th");
  categoryElement.className = "center";
  categoryElement.appendChild(categoryText);
  tableHeader.appendChild(categoryElement);

  const dateText = document.createTextNode("Data");
  const dateElement = document.createElement("th");
  dateElement.className = "center";
  dateElement.appendChild(dateText);
  tableHeader.appendChild(dateElement);

  const valueText = document.createTextNode("Valor");
  const valueElement = document.createElement("th");
  valueElement.className = "center";
  valueElement.appendChild(valueText);
  tableHeader.appendChild(valueElement);

  const actionText = document.createTextNode("Ação");
  const actionElement = document.createElement("th");
  actionElement.className = "center";
  actionElement.appendChild(actionText);
  tableHeader.appendChild(actionElement);

  table.appendChild(tableHeader);

  data.map((item) => {
    const tableRow = document.createElement("tr");
    tableRow.className = "mt smaller";

    // title
    const titleTd = document.createElement("td");
    titleTd.className = "br center";
    const titleText = document.createTextNode(item.title);
    titleTd.appendChild(titleText);
    tableRow.appendChild(titleTd);

    // category
    const categoryTd = document.createElement("td");
    categoryTd.className = "br center";
    const categoryText = document.createTextNode(item.name);
    categoryTd.appendChild(categoryText);
    tableRow.appendChild(categoryTd);

    // date
    const dateTd = document.createElement("td");
    dateTd.className = "br center";
    const date = new Date(item.date);
    const timezoneOffset = date.getTimezoneOffset() * 60 * 1000;
    const adjustedDate = new Date(date.getTime() + timezoneOffset);
    const formattedDate = adjustedDate.toLocaleDateString();
    const dateText = document.createTextNode(formattedDate);
    dateTd.appendChild(dateText);
    tableRow.appendChild(dateTd);

    // value
    const valueTd = document.createElement("td");
    valueTd.className = "center br";
    const valueText = document.createTextNode(
      new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(item.value)
    );
    valueTd.appendChild(valueText);
    tableRow.appendChild(valueTd);

    // delete
    const deleteTd = document.createElement("td");

    deleteTd.style.cursor = "pointer";
    deleteTd.addEventListener("mouseover", () => {
      deleteTd.style.color = "red";
    });
    deleteTd.addEventListener("mouseout", () => {
      deleteTd.style.color = "#010400";
    });
    deleteTd.onclick = () => onDeleteItem(item.id);
    deleteTd.className = "center br";
    const deleteText = document.createTextNode("Excluir");
    deleteTd.appendChild(deleteText);
    tableRow.appendChild(deleteTd);

    // table add table row
    table.appendChild(tableRow);
  });
};

const renderFinanceElements = (data) => {
  const totalItems = data.length;
  const revenues = data
    .filter((item) => Number(item.value) > 0)
    .reduce((acc, item) => acc + Number(item.value), 0);
  const expenses = data
    .filter((item) => Number(item.value) < 0)
    .reduce((acc, item) => acc + Number(item.value), 0);
  const totalValue = Number(revenues) + Number(expenses);
  const totalValueFormated = totalValue;

  // render total releases
  const financeCard1 = document.getElementById("finance-card-1");
  financeCard1.innerHTML = "";

  const totalSubtext = document.createTextNode("Total de lançamentos");
  const totalSubTextElement = document.createElement("h3");
  totalSubTextElement.className = "font";
  totalSubTextElement.appendChild(totalSubtext);
  financeCard1.appendChild(totalSubTextElement);

  const totalText = document.createTextNode(totalItems);
  const totalElement = document.createElement("h1");
  totalElement.id = "total-element";
  totalElement.className = "mt smaller";
  totalElement.appendChild(totalText);
  financeCard1.appendChild(totalElement);

  // render total revenue
  const financeCard2 = document.getElementById("finance-card-2");
  financeCard2.innerHTML = "";

  const revenueSubtext = document.createTextNode("Entrada");
  const revenueSubtextElement = document.createElement("h3");
  revenueSubtextElement.className = "font";
  revenueSubtextElement.appendChild(revenueSubtext);
  financeCard2.appendChild(revenueSubtextElement);

  const revenueText = document.createTextNode(
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(revenues)
  );
  const revenueTextElement = document.createElement("h1");
  revenueTextElement.id = "revenue-element";
  revenueTextElement.className = "mt smaller";
  revenueTextElement.style.color = "#57ce42";
  revenueTextElement.appendChild(revenueText);
  financeCard2.appendChild(revenueTextElement);

  // render total expenses
  const financeCard3 = document.getElementById("finance-card-3");
  financeCard3.innerHTML = "";

  const expensesSubtext = document.createTextNode("Saída");
  const expensesSubtextElement = document.createElement("h3");
  expensesSubtextElement.className = "font";
  expensesSubtextElement.appendChild(expensesSubtext);
  financeCard3.appendChild(expensesSubtextElement);

  const expensesText = document.createTextNode(
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(expenses)
  );
  const expensesTextElement = document.createElement("h1");
  expensesTextElement.id = "expenses-element";
  expensesTextElement.style.color = "#ee2126";
  expensesTextElement.className = "mt smaller";
  expensesTextElement.appendChild(expensesText);
  financeCard3.appendChild(expensesTextElement);

  // render total balance
  const financeCard4 = document.getElementById("finance-card-4");
  financeCard4.innerHTML = "";

  const balanceSubtext = document.createTextNode("Balanço");
  const balanceSubtextElement = document.createElement("h3");
  balanceSubtextElement.className = "font";
  balanceSubtextElement.appendChild(balanceSubtext);
  financeCard4.appendChild(balanceSubtextElement);

  const balanceText = document.createTextNode(
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(totalValue)
  );
  const balanceTextElement = document.createElement("h1");
  balanceTextElement.id = "balance-element";
  balanceTextElement.className = "mt smaller";
  balanceTextElement.style.color = "#5936CD";
  balanceTextElement.appendChild(balanceText);
  financeCard4.appendChild(balanceTextElement);
};

const onLoadFinancesData = async () => {
  try {
    const email = localStorage.getItem("@WalletApp:userEmail");
    const dateInputValue = document.getElementById("select-date").value;
    const result = await fetch(
      `https://mp-wallet-app-api.herokuapp.com/finances?date=${dateInputValue}`,
      {
        method: "GET",
        headers: {
          email: email,
        },
      }
    );
    const data = await result.json();
    renderFinanceElements(data);
    renderFinanceList(data);

    return data;
  } catch (error) {
    return { error };
  }
};

const onLoadUserInfo = () => {
  const email = localStorage.getItem("@WalletApp:userEmail");
  const name = localStorage.getItem("@WalletApp:userName");

  const navbarUserInfo = document.getElementById("navbar-user-container");
  const navbarUserAvatar = document.getElementById("navbar-user-avatar");

  // add user email
  const emailElement = document.createElement("p");
  const emailText = document.createTextNode(email);
  emailElement.appendChild(emailText);
  navbarUserInfo.appendChild(emailElement);

  // add logout link
  const logoutElement = document.createElement("a");
  logoutElement.onclick = () => onLogout();
  logoutElement.style.cursor = "pointer";
  const logoutText = document.createTextNode("sair");
  logoutElement.appendChild(logoutText);
  navbarUserInfo.append(logoutElement);

  // add user first letter inside avatar
  const nameElement = document.createElement("h3");
  const nameText = document.createTextNode(name.charAt(0));
  nameElement.appendChild(nameText);
  navbarUserAvatar.appendChild(nameElement);
};

// Carregas as opções que são exibidas na parte de categorias da MODAL
const onLoadCategoriesPositive = async () => {
  try {
    const categoriesSelect = document.getElementById("input-category-add");
    const response = await fetch(
      `https://mp-wallet-app-api.herokuapp.com/categories`
    );
    const categoriesResult = await response.json();
    categoriesResult.map((category) => {
      const option = document.createElement("option");
      const categoryText = document.createTextNode(category.name);
      option.id = `category_${category.id}`;
      option.value = category.id;
      option.appendChild(categoryText);
      categoriesSelect.appendChild(option);
    });
  } catch (error) {
    alert("Erro ao carregar categorias");
  }
};

// Carregas as opções que são exibidas na parte de categorias da MODAL
const onLoadCategoriesNegative = async () => {
  try {
    const categoriesSelect = document.getElementById("input-category-remove");
    const response = await fetch(
      `https://mp-wallet-app-api.herokuapp.com/categories`
    );
    const categoriesResult = await response.json();
    categoriesResult.map((category) => {
      const option = document.createElement("option");
      const categoryText = document.createTextNode(category.name);
      option.id = `category_${category.id}`;
      option.value = category.id;
      option.appendChild(categoryText);
      categoriesSelect.appendChild(option);
    });
  } catch (error) {
    alert("Erro ao carregar categorias");
  }
};

const openModalPositive = () => {
  const modal = document.getElementById("modal-positive");
  modal.style.display = "flex";
};

const openModalNegative = () => {
  const modal = document.getElementById("modal-negative");
  modal.style.display = "flex";
};

const closeModal = () => {
  const modalPositive = document.getElementById("modal-positive");
  const modalNegative = document.getElementById("modal-negative");
  modalPositive.style.display = "none";
  modalNegative.style.display = "none";
};

// Adiciona os dados de entrada na API
const onCallAddFinancePositive = async (data) => {
  try {
    const email = localStorage.getItem("@WalletApp:userEmail");

    const response = await fetch(
      "https://mp-wallet-app-api.herokuapp.com/finances",
      {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          email: email,
        },
        body: JSON.stringify(data),
      }
    );

    const user = await response.json();
    return user;
  } catch (error) {
    return { error };
  }
};

// Adiciona os dados de saída na API
const onCallAddFinanceNegative = async (data) => {
  try {
    const email = localStorage.getItem("@WalletApp:userEmail");

    const response = await fetch(
      "https://mp-wallet-app-api.herokuapp.com/finances",
      {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          email: email,
        },
        body: JSON.stringify(data),
      }
    );

    const user = await response.json();
    return user;
  } catch (error) {
    return { error };
  }
};

// Captura os dados de movimentação de entrada
const onCreateFinanceRelease1 = async (target) => {
  try {
    const title = target[0].value;
    const value = Number(target[1].value);
    const date = target[2].value;
    const category = Number(target[3].value);
    const result = await onCallAddFinancePositive({
      title,
      value,
      date,
      category_id: category,
    });

    if (result.error) {
      alert("Erro ao adicionar novo dado financeiro.");

      return;
    }
    closeModal();
    onLoadFinancesData();
  } catch (error) {
    alert("Erro ao adicionar novo dado financeiro.");
  }
};

// Captura os dados da movimentação de saida
const onCreateFinanceRelease2 = async (target) => {
  try {
    const title = target[0].value;
    const value = Number(target[1].value) * -1;
    const date = target[2].value;
    const category = Number(target[3].value);
    const result = await onCallAddFinanceNegative({
      title,
      value,
      date,
      category_id: category,
    });

    if (result.error) {
      alert("Erro ao adicionar novo dado financeiro.");

      return;
    }
    closeModal();
    onLoadFinancesData();
  } catch (error) {
    alert("Erro ao adicionar novo dado financeiro.");
  }
};

// Define data inicial do calendario para o dia atual do sistema
const setInitialDate = () => {
  const dateInput = document.getElementById("select-date");
  const nowDate = new Date().toISOString().split("T")[0];
  dateInput.value = nowDate;
  dateInput.addEventListener("change", () => {
    onLoadFinancesData();
  });
};

window.onload = () => {
  setInitialDate();
  onLoadUserInfo();
  onLoadFinancesData();
  onLoadCategoriesPositive();
  onLoadCategoriesNegative();

  const formPositive = document.getElementById("form-finance-release-positive");
  formPositive.onsubmit = (event) => {
    event.preventDefault();
    onCreateFinanceRelease1(event.target);
  };
  const formNegative = document.getElementById("form-finance-release-negative");
  formNegative.onsubmit = (event) => {
    event.preventDefault();
    onCreateFinanceRelease2(event.target);
  };
};
