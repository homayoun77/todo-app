window.addEventListener('load' , showTasks);
let input = document.querySelector('input');
let btn = document.querySelector('button');
let taskList = document.querySelector('ul');

let tasks;

if(!localStorage.getItem('todo')){
    tasks = [];
}
else{
   tasks = getTasks();
}

btn.addEventListener('click' , function(){
    let text = input.value;
    createTask(text);
    saveTasks(text);
    input.value = '';
});

taskList.addEventListener('click' , function(event){
    if(event.target.nodeName === 'I'){
        let target = event.target.parentElement.parentElement;
        target.style = 'display : none';
        tasks.splice(tasks.indexOf(target.textContent) , 1);
        localStorage.setItem('todo' , tasks);
    }
    if(event.target.nodeName === 'LI'){
        event.target.classList.toggle('done');
        event.target.classList.toggle('check');
    }
})

function createTask(text){
    let li = document.createElement('li');
    li.textContent = text;
    li.innerHTML += '<span class="closeBtn"><i class="fa-solid fa-trash-can"></i></span>';
    taskList.appendChild(li);
    return li;
};

function saveTasks(text){
    tasks.push(text);
    localStorage.setItem('todo' , tasks)
}

function getTasks(){
    return localStorage.getItem('todo').split(',');
}

function showTasks(){
    for (const taskText of getTasks()) {
        createTask(taskText);
    }
}