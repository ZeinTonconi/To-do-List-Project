

function createTask(newTittle,newDescription){
    let cell=document.createElement('td');
    cell.setAttribute('class','tarea');
    let newTask=new Task(newTittle,newDescription);
    taskList.push(newTask);
    cell.innerHTML=newTask.createTaskHTML();
    return cell;
}
function createCheck(){
    let cell=document.createElement('td');
    let check=document.createElement('input');
    check.setAttribute('type','checkbox');
    check.addEventListener('change',(event)=>{
        if(event.target.checked)
            event.target.nextSibling.innerText="Completado";
        else
            event.target.nextSibling.innerText="No Completado";
    });
    cell.appendChild(check);
    let label=document.createElement('label');
    label.innerText="No Completado";
    cell.appendChild(label);
    return cell;
}
function changeEditSave(edit, save){
    let task=edit.parentNode.parentNode.firstChild;
    if(edit.className==="visible"){
        edit.className="invisible";
        save.className="visible";
        task.firstElementChild.className="invisible";
        task.lastElementChild.className="visible";
    }
    else{
        edit.className="visible";
        save.className="invisible";
        task.firstElementChild.className="visible";
        task.lastElementChild.className="invisible";
    }
}
function editTask(event){
    let edit=event.target;
    let save=edit.nextSibling;
    changeEditSave(edit,save);
    let task=edit.parentNode.parentNode.firstChild;
    let tittle=task.firstElementChild.firstElementChild.firstChild;
    let description=task.firstElementChild.lastElementChild.firstChild;
    // innerText is for IE DOM, textContent is for the rest of the compliant DOM APIs such as Mozillas.
    // no funciona con innerText
    task.lastElementChild.firstElementChild.value=tittle.textContent;
    if(description!=null)
        task.lastElementChild.lastElementChild.value=description.textContent;
}
function saveTask(event){
    let save=event.target;
    let edit=save.previousSibling;
    changeEditSave(edit,save);
    let task=edit.parentNode.parentNode.firstChild;
    let tittle=task.lastElementChild.firstElementChild.value;
    if(tittle==""){
        alert("Pongale Titulo a la Tarea");
        return;
    }
    let description=task.lastElementChild.lastElementChild.value;
    task.firstElementChild.firstElementChild.firstChild.textContent=tittle;
    if(task.firstElementChild.lastElementChild.hasChildNodes()){
        task.firstElementChild.lastElementChild.firstChild.textContent=description;
    }
    else{
        task.firstElementChild.lastElementChild.appendChild(document.createTextNode(description));
    }
}
function createEdit(){
    let cell=document.createElement('td');
    let edit=document.createElement('input');
    edit.setAttribute('type','button');
    edit.className='visible';
    let save=edit.cloneNode(false);
    save.setAttribute('value','Guardar');
    save.className='invisible';
    save.addEventListener('click',saveTask);
    edit.setAttribute('value','Editar');
    edit.addEventListener('click',editTask);
    cell.appendChild(edit);
    cell.appendChild(save);
    return cell;
}
function addTask(){
    let tittle=document.getElementById('nuevaTarea').value;   
    let description=document.getElementById('descripcionNuevaTarea').value;
    if(tittle===""){
        alert("Pongale Titulo a la Tarea");
        return;
    }
    let row=document.createElement('tr');
    row.appendChild(createTask(tittle,description));
    row.appendChild(createCheck());
    row.appendChild(createEdit());
    document.getElementById("list").appendChild(row);
    document.getElementById('nuevaTarea').value="";
    document.getElementById('descripcionNuevaTarea').value="";
}

document.getElementById('botonTarea').addEventListener('click',addTask);
