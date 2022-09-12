
const data=[
    ["Hacer el Mercado","Leche, tomate, sandia, huevos",false],
    ['Hacer Tarea',"Practica de Fisica, Ejercicios de Mate",true],
    ["Programar",'',false]
];



class Task{
    staticTask="visible";
    dynamicTask="invisible";
    constructor (tittle, description,taskId,isCompleted, buttons){
        this.tittle=tittle;
        this.description=description;
        this.taskId=taskId;
        this.isCompleted=isCompleted;
        this.saveButton=buttons[1];
        this.editButton=buttons[0];
    }
    taskHTML() {
        return `<div class=${this.staticTask}>
                    <div class="taskTittle">${this.tittle}</div>
                    <div class="taskDescription">${this.description}</div>
                </div>
                <div class=${this.dynamicTask}>
                    <input type="text" placeholder="Descripcion de la Tarea" value="${this.tittle}" id="textTittle${this.taskId}"><br>
                    <textarea placeholder="Titulo de la Tarea" id="textDescription${this.taskId}">${this.description}</textarea></div>
                </div>`;
    }
    changeCompleted(){
        this.isCompleted=!this.isCompleted;
    }
    draw(){
        let row=document.getElementById(`task${this.taskId}`);
        row.childNodes[0].innerHTML=this.taskHTML();
        if(row.childNodes[1].childNodes.length===0)
        row.childNodes[1].appendChild(createCheckbox(this.taskId,this.isCompleted));

        this.saveButton.className=this.dynamicTask;
        this.editButton.className=this.staticTask;
    }

    hide(){
        /*this.saveButton.className="invisible";
        this.editButton.className="invisible";
        let div=document.getElementById(`completed${this.taskId}`);
        div.className="invisible";*/
        let row=document.getElementById(`task${this.taskId}`);
        row.className="invisible";
    }

    show(){
        let row=document.getElementById(`task${this.taskId}`);
        row.className="visible";
    }
    
}

function editTask(event){
    let id=event.target.getAttribute('id').slice(4);
    let actualTask=taskList.find(task => task.taskId==id);
    actualTask.staticTask="invisible";
    actualTask.dynamicTask="visible";
    actualTask.draw();
}
function saveTask(event){
    let id=event.target.getAttribute('id').slice(4);
    let actualTask=taskList.find(task => task.taskId==id);
    actualTask.staticTask="visible";
    actualTask.dynamicTask="invisible";
    let newTittle=document.getElementById(`textTittle${actualTask.taskId}`);
    actualTask.tittle=newTittle.value;
    let newDescription=document.getElementById(`textDescription${actualTask.taskId}`);
    actualTask.description=newDescription.value;
    actualTask.draw();
}

function createCheckbox(taskId, taskIsCompleted){
    let div=document.createElement('div');
    div.setAttribute('id',`completed${taskId}`);
    let box=document.createElement("input");
    box.setAttribute('type','checkbox');
    box.setAttribute('id',`check${taskId}`);
    box.checked=taskIsCompleted;
    let label=document.createElement('label');
    label.innerText= taskIsCompleted===true ? 'Completado' : 'No Completado';
    box.addEventListener('click',(event)=>{
        let id=event.target.getAttribute('id').slice(5);
        let actualTask=taskList.find(task => task.taskId==id);
        actualTask.changeCompleted();
        event.target.nextSibling.innerText= actualTask.isCompleted===true ? 'Completado': 'No Completado';
    });
    div.appendChild(box);
    div.appendChild(label);
    return div;
}

let taskList=new Array();
let id=0;

function createButton(idButton,tag,callbackFunc){
    let button=document.createElement('input');
    button.setAttribute('type','button');
    button.setAttribute('id',idButton);
    button.setAttribute('value',tag);
    button.addEventListener('click',callbackFunc);
    return button;
}

function addTask(tittle,description,isCompleted=false){
    if(tittle===""){
        alert("Pongale Titulo a la Tarea");
        return;
    }
    
    let row=document.createElement('tr');
    row.setAttribute('id',`task${id}`);
    for(let i=0;i<3;i++)
        row.appendChild(document.createElement('td'));
        
    row.firstChild.className="task";
    row.childNodes[2].appendChild(createButton(`edit${id}`,'Editar',editTask));
    row.childNodes[2].appendChild(createButton(`save${id}`,'Guardar',saveTask));
    document.getElementById("list").appendChild(row);
    
    let newTask=new Task(tittle,description,id,isCompleted,row.childNodes[2].childNodes);
    taskList.push(newTask);
    newTask.draw();

    id++;   
    
    document.getElementById('tittleNewTask').value="";
    document.getElementById('descriptionNewTask').value="";
}
function clickAddTask(){
    let tittle=document.getElementById('tittleNewTask').value;  
    let description=document.getElementById('descriptionNewTask').value;
    addTask(tittle,description)
}

function filter(event){
    let fil=event.target.value;
    for(let task of taskList){
        if(fil=="all") task.show();
        if(fil=="completed"){
            if(task.isCompleted) task.show();
            else task.hide();
        }
        if(fil=="incompleted"){
            if(task.isCompleted) task.hide();
            else task.show();
        }
    }
}

document.getElementById("addTaskButton").addEventListener('click',clickAddTask);
document.getElementById('filter').addEventListener('change',filter);
init();

function init(){
    for(let task of data){
        addTask(task[0],task[1],task[2]);
    }
}

