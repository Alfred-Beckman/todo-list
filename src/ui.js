import {task} from "./task.js";
import {project, projectList} from "./project.js";
import "./styles.css";

const body = document.querySelector("body");

const projectDiv = document.createElement("div");
projectDiv.className = "projectDiv";

const projectListContainer = document.createElement("div");
projectListContainer.className = "projectList";

const taskDiv = document.createElement("div");
taskDiv.className = "taskDiv";

const taskListContainer = document.createElement("div");
taskListContainer.className = "taskList";

const addProjectBtn = document.createElement("button");
addProjectBtn.className = "projectBtn";

const deletePorjectBtn = document.createElement("button");
deletePorjectBtn.className = "deleteProjectBtn";

const addTaskBtn = document.createElement("button");
addTaskBtn.className = "taskBtn";

let selectedProject;
let test = 0;

export const display = (function(){  
    function save(){
        localStorage.clear();
        saveProjects();
        saveTasks();
    }
    function saveProjects(){
        localStorage.setItem("savedProjectsLength", projectList.length);
        for(let i = 0; i < projectList.length; i++){
            localStorage.setItem("project["+i+"]", JSON.stringify(projectList[i].name));
        }
    }
    function saveTasks(){
        for(let i = 0; i < projectList.length; i++){
            localStorage.setItem("taskListLength"+i, projectList[i].taskList.length);
            for(let x = 0; x < projectList[i].taskList.length; x++){
                localStorage.setItem("project["+i+"] "+"task["+x+"]", JSON.stringify(projectList[i].taskList[x]));
            }
            
        }
    }

    for(let i = 0; i < JSON.parse(localStorage.getItem("savedProjectsLength")); i++){
        projectList.push(new project(JSON.parse(localStorage.getItem("project["+i+"]"))));
        console.log(projectList);
        if( projectList[0] != null)
        {
                selectedProject = projectList[0];
        }
        for(let x = 0; x < JSON.parse(localStorage.getItem("taskListLength"+i)); x++){
            projectList[i].taskList.push(JSON.parse(localStorage.getItem("project["+i+"] "+"task["+x+"]")));
        }
    }



    body.append(projectDiv, taskDiv);
    projectDiv.append(addProjectBtn, deletePorjectBtn, projectListContainer);
    taskDiv.append(addTaskBtn, taskListContainer);
    displayProjects();

    addProjectBtn.addEventListener("click", () => {
        console.log(projectList);
        displayPopup("project");
        displayProjects();
    });

    deletePorjectBtn.addEventListener("click", () => {
        if(projectList.length > 0)
        {
            let selectedIndex = projectList.indexOf(selectedProject);
            projectList.splice(selectedIndex, 1)
            save();
            if(selectedIndex != 0){
                selectedProject = projectList[selectedIndex-1];
            }
            else{
                selectedProject = projectList[selectedIndex];
            }
            displayProjects();
        }
    });

    addTaskBtn.addEventListener("click", () => {
        if(selectedProject != null){
            displayPopup("task");
        }
    });


    function displayProjects(){
        
        projectListContainer.innerHTML = "";
        const projElArray = [];

        for(let i = 0; i < projectList.length; i++){
            let currentProjectEl = document.createElement("div");
            currentProjectEl.className = "projectItem";
            currentProjectEl.textContent = projectList[i].name;

            projElArray.push(currentProjectEl);
            currentProjectEl.addEventListener("click", () => {
                selectedProject = projectList[i];
                
                for(let x = 0; x < projElArray.length; x++){
                    projElArray[x].style.backgroundColor = "rgb(80, 103, 126)";
                }
                projElArray[i].style.backgroundColor = "rgb(124, 166, 202)";
                diplayTasks();
            })
            
            projectListContainer.appendChild(currentProjectEl);
        }
        if(projectList.length > 0){
        projElArray[projectList.indexOf(selectedProject)].style.backgroundColor = "rgb(124, 166, 202)";
        }
        diplayTasks();

    }

    function diplayTasks(){
        taskListContainer.innerHTML = "";

        if(projectList.length > 0){
        for(let i = 0; i < selectedProject.taskList.length; i++){
            let currentTaskEl = document.createElement("div");
            currentTaskEl.className = "taskItem";
            let taskHeader = document.createElement("div");
            taskHeader.className = "popupHeader";
            let taskTitle = document.createElement("div");
            taskTitle.className = "popupTitle";
            let deleteTask = document.createElement("div");
            deleteTask.className = "redx popupClose";
            let taskDesc = document.createElement("p");
            taskDesc.className = "taskDesc";
            let deadline = document.createElement("div");
            deadline.className = "deadline";
            let completeBtn = document.createElement("button");
            completeBtn.className = "button";

            completeBtn.addEventListener("click", () => {
                if(selectedProject.taskList[i].completed)
                    selectedProject.taskList[i].completed = false;
                else
                    selectedProject.taskList[i].completed = true;
                diplayTasks();
                save();
            })

            deleteTask.addEventListener("click", () => {
                selectedProject.removeTask(selectedProject.taskList[i]);
                diplayTasks();
                save();
            })
            completeBtn.textContent = "Completed";
            deadline.textContent = "Deadline: " + selectedProject.taskList[i].deadline;
            taskTitle.textContent = selectedProject.taskList[i].title;
            taskDesc.textContent = selectedProject.taskList[i].desc;

            if(selectedProject.taskList[i].priority){
                console.log("asdasdede");
                taskHeader.style.backgroundColor = "orange";
            }

            if(selectedProject.taskList[i].completed){
                console.log("asdasdede");
                taskHeader.style.backgroundColor = "green";
                completeBtn.style.backgroundColor = "green";
            }

            taskHeader.append(taskTitle, deleteTask);
            currentTaskEl.append(taskHeader, taskDesc, deadline, completeBtn);
            taskListContainer.append(currentTaskEl);
        }
        }
    }

    function displayPopup(type){
        const popupContainer = document.createElement("div");
        popupContainer.className = "popupContainer";
        const popupForm = document.createElement("form");
        popupForm.className = "popupForm";
        const popupHeader = document.createElement("div");
        popupHeader.className = "popupHeader";
        const popupTitle = document.createElement("div");
        popupTitle.className = "popupTitle";
        const popupClose = document.createElement("div");
        popupClose.className = "redx popupClose";

        const itemTitle = document.createElement("input");
        itemTitle.className = "inputs";
        itemTitle.placeholder = "title";

        const createBtn = document.createElement("button");
        createBtn.type = "button";
        createBtn.className = "createBtn";
        createBtn.textContent = "Create";

        createBtn.addEventListener("click", () =>{

            if(type == "project")
            {
                selectedProject = new project(itemTitle.value);
                projectList.push(selectedProject);
                displayProjects();
                popupContainer.remove();
            }
            else if(type == "task")
            {
                selectedProject.addTask(new task(
                itemTitle.value, 
                document.querySelector("textarea").value, 
                document.querySelector(".deadline").value, 
                document.querySelector(".priority").checked,
                document.querySelector(".completed").checked));
                diplayTasks();
                popupContainer.remove();
            }
            save();
        });

        body.append(popupContainer);
        popupContainer.append(popupForm);
        popupForm.append(popupHeader, itemTitle);
        popupHeader.append(popupTitle, popupClose)

        popupClose.addEventListener("click", () => {
            popupContainer.remove();
        });


        if(type == "project")
        {
            popupTitle.textContent = "New Project";
        }
        else if(type == "task")
        {   
            popupTitle.textContent = "New Task";
            const taskDesc = document.createElement("textarea");
            taskDesc.placeholder = "description";
            const deadline = document.createElement("input");
            deadline.className = "deadline";
            deadline.type = "date";

            const priorityContainer = document.createElement("div");
            let priorityText = document.createElement("div");
            const priority = document.createElement("input");
            priority.type = "checkbox";
            priority.className = "priority";
            priorityText = "Priority: ";

            const completedContainer = document.createElement("div");
            let completedText = document.createElement("div");
            const completed = document.createElement("input");
            completed.type = "checkbox";
            completed.className = "completed";
            completedText = "Completed: ";

            completedContainer.append(completedText, completed);
            priorityContainer.append(priorityText, priority);
            popupForm.append(taskDesc, deadline, priorityContainer, completedContainer);
        }
        popupForm.append(createBtn);
    }

});