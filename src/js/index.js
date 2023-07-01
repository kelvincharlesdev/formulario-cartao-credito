const enviarForm = document.getElementById("form");
const thanks = document.querySelector(".thanks");

enviarForm.addEventListener("submit", (e) => {
  e.preventDefault();

  checkForm();
});

function checkForm() {
  const isNameValid = checkInputName();
  const isNumberValid = checkInputNumber();
  const isMesValid = checkInputMes();
  const isAnoValid = checkInputAno();
  const isCvcValid = checkInputCvc();

    //Serve para verificar se todos os inputs estão preenchidos
  if (isNameValid && isNumberValid && isMesValid && isAnoValid && isCvcValid) {
    thanks.classList.remove("desativado");
    enviarForm.classList.add("desativado");
  }
}

const inputName = document.getElementById("input-name");
const nameCard = document.querySelector(".name-card");

function checkInputName() {
  const inputNameValue = inputName.value;

  if (inputNameValue === "") {
    errorInput(inputName, "Type a valid value");
    return false;
  } else {
    const formItem = inputName.parentElement;
    formItem.className = "dados-formt";

    const textMessage = formItem.querySelector(".msg-error");

    textMessage.classList.remove("error");
    return true;
  }
}

// Chamada do input para o cartao

inputName.addEventListener("input", () => {
  const inputValue = inputName.value;

  //usei para limitar o tamanho maximo do nome do usuario
  if (inputValue.length > 22) {
    inputValue = inputValue.slice(0, 22);
  }

  inputName.value = inputValue;

  nameCard.innerText = inputValue.toUpperCase();

  if (inputValue === "") {
    nameCard.innerText = "DIGITE SEU NOME";
  }

  // keypress : dispara quando uma tecla que retorna um valor de caractere é pressionada. Por exemplo, se você pressionar a tela a , este evento vai disparar a letra a , que retorna o valor 97

  inputName.addEventListener("keypress", (e) => {
    // Serve para mapear as teclas digitadas com sua numeração  e retornar essa numeração
    const keyCode = e.keyCode ? e.keyCode : e.which;

    // 47 ao 58 são numeros
    if (keyCode > 47 && keyCode < 58) {
      e.preventDefault();
    }
  });

  // Adiciona um ouvinte de evento para limitar a entrada diretamente no campo de input
  inputName.addEventListener("keydown", (e) => {
    // Verifica se o número de caracteres excede 22 e se a tecla pressionada não é uma tecla de controle (por exemplo, backspace)
    if (inputName.value.length >= 22 && e.key.length === 1) {
      e.preventDefault();
    }
  });
});

const inputNumber = document.getElementById("input-number");
const valueCard = document.querySelector(".number-card");

function checkInputNumber() {
  const inputNumberValue = inputNumber.value;

  if (inputNumberValue === "" || inputNumberValue.length < 19) {
    errorInput(inputNumber, "Type a valid value");
    return false;
  } else {
    const formItem = inputNumber.parentElement;
    formItem.className = "dados-formt";

    const textMessage = formItem.querySelector(".msg-error");

    textMessage.classList.remove("error");
    return true;
  }
}

// Chamada do input para o cartao

inputNumber.addEventListener("input", () => {
  // Obtém o valor do campo de entrada e remove espaços em branco
  let inputValue = inputNumber.value.replace(/\s/g, "");

  // Limita o número a 16 dígitos
  inputValue = inputValue.slice(0, 16);

  // Formata o número em grupos de quatro dígitos separados por espaços
  let formattedNumber = inputValue.replace(/(\d{4})(?=\d)/g, "$1 ");

  // Atualiza o valor do campo de entrada
  inputNumber.value = formattedNumber;

  // Atualiza o conteúdo do elemento de exibição do cartão
  valueCard.innerText = formattedNumber;

  //USEI PARA LIMITAR O INPUT A RECEBER APENAS CARACTERES DE NUMEROS
  inputNumber.addEventListener("keydown", (e) => {
    const codigoTecla = e.keyCode || e.which;
    if (
      !(
        (codigoTecla >= 48 && codigoTecla <= 57) ||
        (codigoTecla >= 96 && codigoTecla <= 105) ||
        codigoTecla == 8 ||
        codigoTecla == 9 ||
        codigoTecla == 32 ||
        codigoTecla == 37 ||
        codigoTecla == 39
      )
    ) {
      e.preventDefault();
    }
  });
});

const inputMes = document.getElementById("input-mes");
let validMesAnoCard = document.querySelector(".value-card");

function checkInputMes() {
  const inputMesValue = inputMes.value.trim();

  if (inputMesValue === "" || inputMesValue < 1 || inputMesValue > 12) {
    errorInput(inputMes, "Type a valid value");
    return false;
  } else {
    const formItem = inputMes.parentElement;
    formItem.className = "dados-formt";

    const textMessage = formItem.querySelector(".msg-error");

    textMessage.classList.remove("error");
    return true;
  }
}

// Chamada do inputMes para o cartao ju8nto com a function inseretDateVenc a
inputMes.addEventListener("input", insertDateVenc);

//USEI PARA LIMITAR O INPUT DE MES A RECEBER APENAS CARACTERES DE NUMEROS
inputMes.addEventListener("keydown", (e) => {
  const codigoTecla = e.keyCode || e.which;
  if (
    !(
      (codigoTecla >= 48 && codigoTecla <= 57) ||
      (codigoTecla >= 96 && codigoTecla <= 105) ||
      codigoTecla == 8 ||
      codigoTecla == 9 ||
      codigoTecla == 32 ||
      codigoTecla == 37 ||
      codigoTecla == 39
    )
  ) {
    e.preventDefault();
  }

  //usei para limitar o tamanho maximo do input de mes
  let tamanhoMaximo = 1;
  if (inputMes.value.length > tamanhoMaximo) {
    inputMes.value = inputMes.value.slice(0, tamanhoMaximo);
  }
});

const inputAno = document.getElementById("input-ano");

function checkInputAno() {
  const inputAnoValue = inputAno.value;

  let dataAtual = new Date();
  // Obter os últimos dois dígitos do ano atual
  let anoAtual = dataAtual.getFullYear() % 100;

  if (inputAnoValue === "" || inputAnoValue <= anoAtual) {
    errorInput(inputAno, "Type a valid value");
    return false;
  } else {
    const formItem = inputAno.parentElement;
    formItem.className = "dados-formt";

    const textMessage = formItem.querySelector(".msg-error");

    textMessage.classList.remove("error");
    return true;
  }
}

// Chamada do inputMes para o cartao ju8nto com a function inseretDateVenc

inputAno.addEventListener("input", insertDateVenc);

function insertDateVenc() {
  const inputMesValue = inputMes.value;
  const inputAnoValue = inputAno.value;
  validMesAnoCard.innerText = `${inputMesValue}/${inputAnoValue}`;
}

//USEI PARA LIMITAR O INPUT DE MES A RECEBER APENAS CARACTERES DE NUMEROS
inputAno.addEventListener("keydown", (e) => {
  const codigoTecla = e.keyCode || e.which;
  if (
    !(
      (codigoTecla >= 48 && codigoTecla <= 57) ||
      (codigoTecla >= 96 && codigoTecla <= 105) ||
      codigoTecla == 8 ||
      codigoTecla == 9 ||
      codigoTecla == 32 ||
      codigoTecla == 37 ||
      codigoTecla == 39
    )
  ) {
    e.preventDefault();
  }

  //usei para limitar o tamanho maximo do input de mes
  let tamanhoMaximo = 1;
  if (inputAno.value.length > tamanhoMaximo) {
    inputAno.value = inputAno.value.slice(0, tamanhoMaximo);
  }
});

const inputCvc = document.getElementById("input-cvc");
const numberCvcCard = document.querySelector(".security-card");

function checkInputCvc() {
  const inputCvcValue = inputCvc.value;

  if (inputCvcValue === "" || inputCvcValue.length < 3) {
    errorInput(inputCvc, "Type a valid value");
    return false;
  } else {
    const formItem = inputCvc.parentElement;
    formItem.className = "dados-formt";

    const textMessage = formItem.querySelector(".msg-error");

    textMessage.classList.remove("error");
    return true;
  }
}

// Chamada do input para o cartao

inputCvc.addEventListener("input", () => {
  const inputCvcValue = inputCvc.value;

  numberCvcCard.innerText = inputCvcValue.slice(0, 3);

  //usei para limitar o tamanho maximo do nome do usuario

  if (inputCvcValue.length > 3) {
    // Serve para fixar o input para 16 dígitos
    inputCvc.value = inputCvcValue.slice(0, 3);
  }

  // keypress : dispara quando uma tecla que retorna um valor de caractere é pressionada. Por exemplo, se você pressionar a tela a , este evento vai disparar a letra a , que retorna o valor 97

  inputCvc.addEventListener("keydown", (e) => {
    const codigoTecla = e.keyCode || e.which;
    if (
      !(
        (codigoTecla >= 48 && codigoTecla <= 57) ||
        (codigoTecla >= 96 && codigoTecla <= 105) ||
        codigoTecla == 8 ||
        codigoTecla == 9 ||
        codigoTecla == 32 ||
        codigoTecla == 37 ||
        codigoTecla == 39
      )
    ) {
      e.preventDefault();
    }
  });
});

function errorInput(input, message) {
  const formItem = input.parentElement;

  const textMessage = formItem.querySelector(".msg-error");

  textMessage.classList.add("error");

  textMessage.innerText = message;
  formItem.className = "dados-form error";
}

const btnVoltar = document.getElementById("continue");

btnVoltar.addEventListener("click", () => {
  enviarForm.classList.remove("desativado");
  thanks.classList.add("desativado");
});
