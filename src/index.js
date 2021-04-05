/*
 **APLICACION DE TAREAS EN CONSOLA
 **La aplicacion es capaz de:
 **1. Crear tareas.
 **2. Borrar tareas
 **3. Actualizar tareas
 **4. Listar tareas
 */
require("colors");
const inquirer = require("inquirer");
const {
    main,
    create,
    list,
    listTasks,
    update,
    updateConfirm,
    newDescription,
    drop,
} = require("./questions");
const { createTask, showTasks, updateTask, deleteTask } = require("./CRUD");

(async() => {
    try {
        let answers;
        do {
            console.log("===================================================".green);
            console.log("\t\tTASKS APP - NODE JS".bold.green);
            console.log("===================================================".green);

            answers = await inquirer.prompt(main);
            switch (answers.main) {
                case "Crear":
                    let { description } = await inquirer.prompt(create);
                    const message = "==============Tarea creada con exito!=============="
                        .bold.green;
                    if (description !== "")
                        createTask(description).then(console.log(message));
                    else
                        console.log(
                            "===============Tarea sin descripción===============".bold.red
                        );
                    break;

                case "Listar":
                    let { select } = await inquirer.prompt(list);
                    let tasks = await showTasks(select);
                    if (tasks.length > 0) await inquirer.prompt(listTasks(tasks));
                    else
                        console.log(
                            "============No hay tareas para mostrar============".bold.red
                        );
                    break;

                case "Actualizar":
                    let tasksTwo = await showTasks();
                    if (tasksTwo.length === 0) {
                        console.log(
                            "============No hay tareas para actualizar============".bold.red
                        );
                        break;
                    }
                    let { descriptionTask } = await inquirer.prompt(update(tasksTwo));
                    let { confirm } = await inquirer.prompt(updateConfirm);
                    if (confirm) {
                        let { descriptionTwo } = await inquirer.prompt(newDescription);
                        await updateTask(descriptionTask, descriptionTwo);
                    } else await updateTask(descriptionTask);
                    console.log(
                        "============Tarea actualizada con exito!===========".bold.green
                    );
                    break;

                case "Borrar":
                    let tasksThree = await showTasks();
                    if (tasksThree.length === 0) {
                        console.log(
                            "==============No hay tareas para borrar==============".bold.red
                        );
                        break;
                    }
                    const { deleteTasks } = await inquirer.prompt(
                        drop(await showTasks())
                    );
                    await deleteTask(deleteTasks);
                    console.log(
                        "==============Tarea borrada con exito!============".bold.green
                    );
                    break;

                case "Salir":
                    console.log(
                        "========GRACIAS POR UTILIZAR LA APLICACION!========".bold.green
                    );
            }
            console.log("\n\n\n");
        } while (answers.main !== "Salir");
    } catch (err) {
        console.error(err.message);
    }
})();