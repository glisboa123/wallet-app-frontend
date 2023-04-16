const renderFinanceList = (data) => {
  const table = document.getElementById("finances-table");
  // <tr>
  //   <td>Item 1</td>
  //   <td>Item 2</td>
  //   <td>Item 3</td>
  //   <td class="center">Item 3</td>
  //   <td class="right">Item 3</td>
  // </tr>;

  data.map((item) => {
    const tableRow = document.createElement("tr");
    tableRow.className = "mt smaller";

    // title
    const titleTd = document.createElement("td");
    const titleText = document.createTextNode(item.title);
    titleTd.appendChild(titleText);
    tableRow.appendChild(titleTd);

    // category
    const categoryTd = document.createElement("td");
    const categoryText = document.createTextNode(item.name);
    categoryTd.appendChild(categoryText);
    tableRow.appendChild(categoryTd);

    // category
    const dateTd = document.createElement("td");
    const dateText = document.createTextNode(
      new Date(item.date).toLocaleDateString()
    );
    dateTd.appendChild(dateText);
    tableRow.appendChild(dateTd);

    // value
    const valueTd = document.createElement("td");
    valueTd.className = "center";
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
    deleteTd.className = "right";
    const deleteText = document.createTextNode("deletar");
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
  const totalReleases = document.createTextNode(totalItems);
  const totalReleasesElement = document.createElement("h1");
  totalReleasesElement.className = "mt smaller";
  totalReleasesElement.appendChild(totalReleases);
  financeCard1.appendChild(totalReleasesElement);

  // render total revenue
  const financeCard2 = document.getElementById("finance-card-2");
  const revenueText = document.createTextNode(
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(`${revenues}`)
  );
  const revenueTextElement = document.createElement("h1");
  revenueTextElement.className = "mt smaller";
  revenueTextElement.style.color = "#57ce42";
  revenueTextElement.appendChild(revenueText);
  financeCard2.appendChild(revenueTextElement);

  // render total expenses
  const financeCard3 = document.getElementById("finance-card-3");
  const expensesText = document.createTextNode(
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(`${expenses * -1}`)
  );
  const expensesTextElement = document.createElement("h1");
  expensesTextElement.className = "mt smaller";
  expensesTextElement.style.color = "#ee2126";
  expensesTextElement.appendChild(expensesText);
  financeCard3.appendChild(expensesTextElement);

  // render total balance
  const financeCard4 = document.getElementById("finance-card-4");
  const balanceText = document.createTextNode(
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(`${totalValueFormated}`)
  );
  const balanceTextElement = document.createElement("h1");
  balanceTextElement.className = "mt smaller";
  balanceTextElement.style.color = "#5936cd";
  balanceTextElement.appendChild(balanceText);
  financeCard4.appendChild(balanceTextElement);
};

const onLoadFinancesData = async () => {
  try {
    const email = localStorage.getItem("@WalletApp:userEmail");
    const date = "2022-12-15";
    const result = await fetch(
      `https://mp-wallet-app-api.herokuapp.com/finances?date=${date}`,
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
  const logoutText = document.createTextNode("sair");
  logoutElement.appendChild(logoutText);
  navbarUserInfo.append(logoutElement);

  // add user first letter inside avatar
  const nameElement = document.createElement("h3");
  const nameText = document.createTextNode(name.charAt(0));
  nameElement.appendChild(nameText);
  navbarUserAvatar.appendChild(nameElement);
};

const onLoadCategories = async () => {
  try {
    const categoriesSelect = document.getElementById("input-category");
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

const openModal = () => {
  const modal = document.getElementById("modal");
  modal.style.display = "flex";
};

const closeModal = () => {
  const modal = document.getElementById("modal");
  modal.style.display = "none";
};

window.onload = () => {
  onLoadUserInfo();
  onLoadFinancesData();
  onLoadCategories();
};
