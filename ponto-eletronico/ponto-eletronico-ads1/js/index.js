// TO-DO:
// Organizar código

//Essas variaveis estao selecinando o elemento <p> pelo id e armazenando esses elementos 
//nessas variáveis
const diaSemana = document.getElementById("dia-semana");
const diaMesAno = document.getElementById("dia-mes-ano");
const horaMinSeg = document.getElementById("hora-min-seg");

//array para armazenar os dias da semana e depois alocar o "arrayDayWeek" no "diaSemana" 
//de acordo com o dia da semana
const arrayDayWeek = ["Domingo","Segunda-feira","Terça-feira","Quarta-feira","Quinta-feira","Sexta-feira","Sabado"]

const dialogPonto = document.getElementById("dialog-ponto");


navigator.geolocation.getCurrentPosition((position) => {
    console.log(position);
    console.log(position.coords.latitude);
    console.log(position.coords.longitude);
});


let proxPonto = {
    "entrada": "intervalo",
    "intervalo": "volta-intervalo",
    "volta-intervalo": "saida",
    "saida": "entrada"
}

// TO-DO:
// apresentar para o usuário a data e hora atualizados
// atualizar a data todos os dias 00:00
// atualizar a hora todo segundo
const btnRegistrarPonto = document.getElementById("btn-registrar-ponto");
btnRegistrarPonto.addEventListener("click", () => {
    let dialogSelect = document.getElementById("select-tipos-ponto");
    let ultimoPonto = localStorage.getItem("tipoUltimoPonto");
    dialogSelect.value = proxPonto[ultimoPonto];
    
    dialogPonto.showModal();
});


const btnDialogFechar = document.getElementById("btn-dialog-fechar");
btnDialogFechar.addEventListener("click", () => {
    dialogPonto.close();
});


function recuperaPontosLocalStorage() {
    let todosOsPontos = localStorage.getItem("registro");

    if(!todosOsPontos) {
        return [];
    }

    return JSON.parse(todosOsPontos);
}



function salvarRegistroLocalStorage(ponto) {
    let pontos = recuperaPontosLocalStorage();
    
    pontos.push(ponto);
    // 1 - recuperar os registros anteriores
    // 2 - adicionar o novo registro (ponto) no final do array de registros

    localStorage.setItem("registro", JSON.stringify(pontos));
}

const btnDialogRegistrarPonto = document.getElementById("btn-dialog-registrar-ponto");
btnDialogRegistrarPonto.addEventListener("click", () => {
    let data = dataCompleta();
    let hora = horaCompleta();
    let tipoPonto = document.getElementById("select-tipos-ponto").value;

    let ponto = {
        "data": data,
        "hora": hora,
        "tipo": tipoPonto,
        "id": 1
    }

    // TO-DO:
    // Somente o ultimo registro está sendo salvo
    // Garantir que o código persista sempre o histórico todo
    // Salvar os registros em um array de objetos de registro
    salvarRegistroLocalStorage(ponto);
    
    localStorage.setItem("tipoUltimoPonto", tipoPonto);

    // TO-DO:
    // salvar o útimo tipo do ponto registrado pelo usuário
    // fazer o select considerar esse último ponto e selecionar, por padrão
    // o próximo possível ponto do usuário
    // Exemplo: usuário registrou "entrada", determinar que o select apresente "intervalo" como valor padrão

    console.log(ponto);
    dialogPonto.close();
});

function daySemana() {
    const date = new Date();
    return arrayDayWeek[date.getDay()];
}

function dataCompleta() {
    const date = new Date();
    return String(date.getDate()).padStart(2, '0') + "/" + String(date.getMonth() + 1).padStart(2, '0') + "/" + date.getFullYear();
}

function horaCompleta() {
    const date = new Date();
    return String(date.getHours()).padStart(2, '0') + ":" + String(date.getMinutes()).padStart(2, '0') + ":" + String(date.getSeconds()).padStart(2, '0');
}

function atualizaHora() {
    horaMinSeg.textContent = horaCompleta();
}

atualizaHora();
setInterval(atualizaHora, 1000);

diaSemana.textContent = daySemana();
diaMesAno.textContent = dataCompleta();
