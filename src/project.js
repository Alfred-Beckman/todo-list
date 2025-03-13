function Project(name){
    this.name = name;
    this.taskList = [];

    this.addTask = (task) => {
        this.taskList.push(task);
    }
     this.removeTask = (task) => {
        this.taskList.splice(this.taskList.indexOf(task), 1);
     }

}
const project = Project;
let projectList = [];

export {project, projectList};