const main = {
    type: "list",
    name: "main",
    message: "Cuál es tu elección?",
    choices: ["Crear", "Listar", "Actualizar", "Borrar", "Salir"],
};
const create = {
    type: "input",
    name: "description",
    message: `ESCRIBE UNA DESCRIPCION:`,
};
const list = {
    type: "rawlist",
    name: "select",
    message: `Cómo deseas listar las tareas?`,
    choices: ["Todas", "Completadas", "Incompletas"],
    default: "Todas",
};
const listTasks = (choices) => {
    return {
        type: "list",
        name: "choices",
        message: `Listado de tareas`,
        choices,
        loop: false,
    };
};
const update = (choices) => {
    return {
        type: "rawlist",
        name: "descriptionTask",
        message: `Escoge una tarea para actualizar`,
        choices,
    };
};
const updateConfirm = {
    type: "confirm",
    name: "confirm",
    message: "Deseas modificar la descripción?",
    default: false,
};
const newDescription = {
    type: "input",
    name: "descriptionTwo",
    message: `ESCRIBE UNA NUEVA DESCRIPCION:`,
};
const drop = (choices) => {
    return {
        type: "checkbox",
        name: "deleteTasks",
        message: "Escoge las tareas que deseas eliminar",
        choices,
    };
};

module.exports = {
    main,
    create,
    list,
    listTasks,
    update,
    updateConfirm,
    newDescription,
    drop,
};