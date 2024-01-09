let inputNovaTarefa = document.querySelector(".input-nova-tarefa");
let btnAdicionar = document.querySelector(".btn-add-task");
let listaTarefas = document.querySelector(".task-list");
let janelaEdicao = document.querySelector("#janelaEdicao");
let janelaEdicaoFundo = document.querySelector("#janelaEdicaoFundo");
let janelaEdicaoBtnFechar = document.querySelector("#janelaEdicaoBtnFechar");
let btnAtualizarTarefa = document.querySelector("#btnAtualizarTarefa");
let idTarefaEdicao = document.querySelector("#idTarefaEdicao");
let inputTarefaNomeEdicao = document.querySelector("#inputTarefaNomeEdicao");

const ENTER_KEY_CODE = 13;
let dbTarefas = [];




//Capturando evento de clicar no ENTER
inputNovaTarefa.addEventListener("keypress", (e) => {
  if (e.keyCode === ENTER_KEY_CODE) {
    /*criando um objeto */
    let tarefa = {
      name: inputNovaTarefa.value,
      id: gerarId(),
    };
    console.log(tarefa);
    addTask(tarefa);
  }
});

janelaEdicaoBtnFechar.addEventListener("click", (e) => {
  alternarJanelaEdicao();
});

btnAtualizarTarefa.addEventListener("click", (e) => {
  e.preventDefault();

  let idTarefa = idTarefaEdicao.innerHTML.replace("#", "");

  let tarefa = {
    name: inputTarefaNomeEdicao.value,
    id: idTarefa,
  };

  let tarefaAtual = document.getElementById("" + idTarefa + "");

  if (tarefaAtual) {
    let li = criarTagLI(tarefa);
    listaTarefas.replaceChild(li, tarefaAtual);
    alternarJanelaEdicao();
  } else {
    alert("Elemento HTML não encontrado!");
  }
});

btnAdicionar.addEventListener("click", (e) => {
  /*criando um objeto */
  let tarefa = {
    name: inputNovaTarefa.value,
    id: gerarId(),
  };
  addTask(tarefa);
});

function addTask(tarefa) {
  let li = criarTagLI(tarefa);
  listaTarefas.appendChild(li);

  //salvando task local storage
  saveTask(tarefa);
  //limpando o input
  inputNovaTarefa.value = "";
  inputNovaTarefa.focus();
}

function criarTagLI(tarefa) {
  let li = document.createElement("li");
  li.id = tarefa.id; /*passando o id da tarefa para a li para conseguir editar e excluir */

  let span = document.createElement("span");
  span.classList.add("texto-tarefa");
  span.innerHTML = tarefa.name;

  let div = document.createElement("div");

  let btnCheck = document.createElement("button");
  btnCheck.classList.add("btn-acao");
  btnCheck.innerHTML = `<i class="fa fa-check"></i>`;

  let btnEditar = document.createElement("button");
  btnEditar.classList.add("btn-acao");
  btnEditar.innerHTML = `<i class="fa fa-pencil"></i>`;
  btnEditar.setAttribute("onclick", "editar(" + tarefa.id + ")");
  /*passando id da tarefa que cliquei para funcao editar */

  let btnDeletar = document.createElement("button");
  btnDeletar.classList.add("btn-acao");
  btnDeletar.innerHTML = ` <i class="fa fa-trash"></i>`;
  btnDeletar.setAttribute("onclick", "excluir(" + tarefa.id + ")");
  /*passando id da tarefa que cliquei para funcao excluir */

  // Adicionando os buttons dentro da div
  div.appendChild(btnCheck);
  div.appendChild(btnEditar);
  div.appendChild(btnDeletar);

  //Adicionando o span e a div dentro de LI
  li.appendChild(span);
  li.appendChild(div);

   
  return li;
}

function editar(idTarefa) {
  let li = document.getElementById("" + idTarefa + "");
  if (li) {
    idTarefaEdicao.innerHTML = "#" + idTarefa;
    inputTarefaNomeEdicao.value = li.innerText;
    alternarJanelaEdicao();
  } else {
    alert("Elemento HTML não encontrado!");
  }
}

function excluir(idTarefa) {

    const indiceTask =  dbTarefas.findIndex( t => t.id == idTarefa);

    if(indiceTask < 0 ){

    }
    dbTarefas.splice(indiceTask, 1)
    saveTask();

    let li = document.getElementById("" + idTarefa + "");
    if (li) listaTarefas.removeChild(li);
}


function alternarJanelaEdicao() {
  janelaEdicao.classList.toggle("abrir");
  janelaEdicaoFundo.classList.toggle("abrir");
}


function saveTask(tarefa){
    dbTarefas.push(tarefa)
    
    const taskJSON = JSON.stringify(dbTarefas);
    localStorage.setItem('task-list', taskJSON);

}

function getTaskLocalStorage(){
    const getTask = localStorage.getItem('task-list');
    const dbTarefas = JSON.parse(getTask);
    console.log(dbTarefas); // Verifique se os dados estão sendo corretamente recuperados

    if (dbTarefas) {
        for (let tarefa of dbTarefas) {
            addTask(tarefa); // Adiciona cada tarefa à lista de tarefas na página
        }
    }
}

getTaskLocalStorage();


function gerarId() {
  return Math.floor(Math.random() * 3000);
}

