const express = require(`express`);
const app     = express();
const port    = 3000;
app.use(express.json())

let tasks = [ 
    {id: 1, task: `Task 1`},
    {id: 2, task: `Task 2`},
]

app.get(`/tasks`, (request, response) => {
    response.json(tasks)
})

app.post(`/tasks`, (request, response) => {
    const new_task = {
        id: tasks.length + 1,
        task: request.body.task
    }
    tasks.push(new_task)
    response.send(new_task)
})

app.put(`/tasks/:param_id`, (request, response) => {
    const { param_id } = request.params;
    const { task } = request.body;

    const found_task = tasks.findIndex(task => task.id === parseInt(param_id))

    if(found_task > -1) {
        tasks[found_task].task = task
        response.send(tasks[found_task])
    } else {
        response.send(`no task for you`)
    }
})

app.delete(`/tasks/:id`, (request, response) => {
    const { id } = request.params; 
    const task_index = tasks.findIndex(task => task.id === parseInt(id));
    if(task_index > -1) {
        const deleted_task = tasks.splice(task_index,1);
        response.send(deleted_task[0])
    } {
        response.send(`no delete for you`)
    }
})

app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
})
