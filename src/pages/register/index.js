const onCallRegister = async (email, name) => {
  try {
    const data = {
      email,
      name,
    };

    const response = await fetch(
      "https://mp-wallet-app-api.herokuapp.com/users",
      {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
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

const isValidName = (name) => {
  const re = /^[a-zA-Z\s]*$/;
  return re.test(name);
};

const isValidEmail = (email) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

const onRegister = async () => {
  const email = document.getElementById("input-email").value;
  const name = document.getElementById("input-name").value;

  if (!isValidName(name)) {
    alert(
      "Por favor, insira um nome válido (apenas letras e espaços em branco)."
    );
    return;
  }

  if (!isValidEmail(email)) {
    alert("Por favor, insira um endereço de e-mail válido.");
    return;
  }

  const result = await onCallRegister(email, name);

  if (result.error) {
    return alert("O email inserido ja está cadastrado");
  }
  localStorage.setItem("@WalletApp:userEmail", result.email);
  localStorage.setItem("@WalletApp:userName", result.name);
  localStorage.setItem("@WalletApp:userId", result.id);
  window.open("../home/index.html", "_self");
};

window.onload = () => {
  const form = document.getElementById("form-register");
  form.onsubmit = (event) => {
    event.preventDefault();
    onRegister();
  };
};
