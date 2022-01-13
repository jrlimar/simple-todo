var Task = new Object();

Task.Load = function (config){

    if (typeof config.ativarEventoExterno !== undefined && typeof config.evento === "function"){
        SetListenerTaskEvent(config.evento);
    }
}

const addBtn = document.querySelector("#add-btn");

addBtn.addEventListener("click", function(e){

    e.preventDefault();

    AddTask();
});

function AddTask(){

    const title = document.querySelector("#task-title").value;

    if (!title){
        alert("Informe uma tarefa antes de adicionar");
        return;
    }
        
    var template = document.querySelector(".template");
    
    //clonar template html
    var newTask = template.cloneNode(true);
    newTask.querySelector(".task-title").textContent = title;

    //remover hide
    newTask.classList.remove("template");
    newTask.classList.remove("hide");

    //ADD NEW TASK
    var list = document.querySelector("#task-list");
    list.appendChild(newTask);

    //Pegar botão REMOVER 
    newTask.querySelector(".remove-btn").addEventListener("click", function(){
        RemoveTask(this);
    });

    //Pegar botão DONE 
    newTask.querySelector(".done-btn").addEventListener("click", function(){
    DoneTask(this);
    });

    ClearTask();
    UpdateDateTask();
    DispatchSaveEvent();
}


function DoneTask(task){
    task.parentNode.classList.toggle("done");
}

function RemoveTask(task){
    task.parentNode.remove(true);
}

function ClearTask(){
    document.querySelector("#task-title").value = "";
}

function UpdateDateTask(){
    var taskData = document.querySelector("#task-update-data");
    taskData.innerText = new Date();
}


/*

Eventos - Recebo no load da pagina o nome da function que vai ser o evento,
          ao carregar a pagina seto o listener do event SetListenerTaskEvent,
          ao clicar no botão é despachado o evento

*/

DispatchSaveEvent = function () {
    var data = "dados enviados e recebidos ....";
    window.dispatchEvent(new CustomEvent('save', { bubbles: true, detail:  { value: data } }));
}

function SetListenerTaskEvent(func){
    window.addEventListener("save", func, false);
}

NewTaskEvent = function(data){
    console.log("Função do evento que foi disparada e sendo executada");
    console.log(data.detail.value)    
}