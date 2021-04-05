require("colors");
const fs = require("fs");

let tasks = [];

const loadDB = async() => {
    try {
        tasks = require("../db/data.json");
    } catch (err) {
        await fs.createWriteStream("../db/data.json");
    }
};
const save = async() => {
    await fs.writeFile("../db/data.json", JSON.stringify(tasks), (err) => {
        if (err) throw new Error("File not created", err);
    });
};
const createTask = async(description) => {
    await loadDB();
    let indexFound = -1;
    if (tasks.length !== 0)
        indexFound = tasks.findIndex((task) => task.description === description);
    if (indexFound !== -1)
        throw new Error(`La tarea #${indexFound + 1} tiene la misma descripción`);
    let task = { description, completed: false };
    tasks.push(task);
    await save();
    return task;
};
const showTasks = async(select = "Todas") => {
    await loadDB();
    let foo = [];
    if (select === "Todas") foo = tasks;
    else if (select === "Completadas")
        foo = tasks.filter((task) => task.completed === true);
    else if (select === "Incompletas")
        foo = tasks.filter((task) => task.completed === false);

    let showTasks = [];
    for (let i = 0; i < foo.length; i++) {
        showTasks.push(
            `${foo[i].description} ${
        foo[i].completed
          ? ".:COMPLETADA:.".bold.green
          : ".:INCOMPLETA:.".bold.red
      }`
        );
    }
    return showTasks;
};
const updateTask = async(description, newDescription = null) => {
    await loadDB();
    if (tasks.length === 0)
        throw new Error(
            "============No hay tareas para actualizar============".bold.red
        );
    let indexFound = tasks.findIndex((task) =>
        description.includes(task.description)
    );
    tasks[indexFound].completed = !tasks[indexFound].completed;
    if (newDescription) tasks[indexFound].description = newDescription;
    let updateTask = tasks[indexFound];
    await save();
    return updateTask;
};
const deleteTask = async(deleteTasks) => {
    await loadDB();
    let indexFound;
    deleteTasks.forEach((deleteTask) => {
        indexFound = tasks.findIndex((task) =>
            deleteTask.includes(task.description)
        );
        tasks.splice(indexFound, 1);
    });
    await save();
    return true;
};

module.exports = { createTask, showTasks, updateTask, deleteTask };