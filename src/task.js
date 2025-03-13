export function task(title, desc, deadline, priority, completed)
{
    this.title = title;
    this.desc = desc;
    this.deadline = deadline;
    this.priority = priority;
    this.completed = completed;

    this.setProps = (t, d, dl, p, c) =>{
        this.title = t;
        this.desc = d;
        this.deadline = dl;
        this.priority = p;   
        this.completed = c;
    }
}