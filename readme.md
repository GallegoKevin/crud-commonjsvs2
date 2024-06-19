# CLASE SEMANA 14_S1

## Vite

Pasos:

1. Ejecutar  el terminal en administrador , localizarnos en desktop y luego ingresar el comando:
```
npm create vite@latest
```
2. Nos vas a avisar si deseamos aceptar el proceso, le damos `y` , luego nos solicita:
- `project name: "crud-commonjs"` , colocamos el nombre de nuestro proyecto
3. Nos va a solicitar seleccionar el framework , en este caso seleccionamos `vanilla`.
4. Nos va a solicitar seleccionar un variant , en este caso vamos a seleccionar `JavaScript`.
5. Abrimos el proyecto creado con visual studio.
6. En el terminal verificamos:
- version de note : **"node -v"**
- Definimos la version actual como predeterminado : **"nvm use 20.14.0"**
7. Instalar las dependencias con el comando:
    ```
    npm install
    ```
8. Ejecutar un comando de los scripts en este caso build :
    ```
    npm run build
    ```
**Build: Nos muestra una carpeta con todo optimizado, para subir a producción**

9. Ejecutar el comando dev con :
    ```
    npm run dev
    ```
    - Genera un enlace : `http://localhost:5173/`

10. Editar `main.js`

11. Instalar json-server  con el comando:

    ```
    npm install json-server
    ```
12.  crear un `db.json` a nivel raiz

13.  ingresar los siguientes datos en db.json:

            ```
            {
            "task": [
                { "id": "1", "title": "a title", "author": "Juan" },
                { "id": "2", "title": "another title", "author": "Felipe" }
            ]
            }
            ```
14. ejecutar el db.json con el comando:

    ```
    npx json-server db.json
    ```

    - Nos va a generar un enlace: `http://localhost:3000/task`


15. editar main.js 
    ```
    import './style.css';
    
    // VARIABLES
    
    loadListeners();
    
    // LISTENERS
    function loadListeners() {
    document.addEventListener('DOMContentLoaded', readTasks);
    }
    
    // FUNCTIONS
    
    async function readTasks() {
    const data = await fetch ('http://localhost:3000/task');
    const req = await data.json();

    console.log (req);
    }

    //readTasks();
    ```

16. abrir otro termianl y luego  instalar axios: "npm i axios -D"

17. editamos para trabajar con axios, main.js: 

    ```
    // import axios from 'axios';
    import axios from 'axios';
    import './style.css';
    
    // VARIABLES
    
    loadListeners();
    
    // LISTENERS
    function loadListeners() {
    document.addEventListener('DOMContentLoaded', readTasks);
    }
    
    // FUNCTIONS
    
    async function readTasks() {
    const { data } = await axios.get('http://localhost:3000/task');
    console.log(data);
    }
    
    async function createTask(task) {
    const taskToCreate = {
        title: 'new Task',
        author: 'Pedro',
    };
    
    const data = await axios.post('http://localhost:3000/task', taskToCreate);
    
    console.log(data);
    }
    
    async function deleteTask(idDelete) {
    const idToTaskDelete = '2';
    const data = await axios.delete(`http://localhost:3000/task/${idToTaskDelete}`);
    
    // console.log(data);
    }
    
    // createTask();
    // deleteTask();

    ```

## TAREA:

```
-READ (Hacer que pinte la informacion)
​
-POST(Hacer un formulario que agarre la data y la agregue a base de datos y tmb a la UI cuando haces click en el boton Agregar)
​
-DELETE(Hacer un button en cada elemento, que al hacer. click en liminar lo elimie de base de datos y lo elimine de la UI)
``` 


Para cumplir con las condiciones: 

1. Se Modifico el HTML, donde se creo el formulario y la tabla donde se van a añadir los datos , asi como tambien se creo el boton añadir.

2. Se modifico el Javascrip **('main.js')** 
    
    Se añadio en **function loadListeners()** :
    ```
    document.getElementById('task-form').addEventListener('submit', createTask);
    ```
    Para Llamar a la función createTask al enviar el formulario.

3. se modifico la `function readTask`. 

    Donde vamos a poder ver :

    - Solicitud GET a la API
    - Obtencion de datos 
    - Actualizacion del DOM
    - Iteracion de datos 
    - Agregar event listeners a los botones

4. Se modifico la `function createTask`. 

    Donde vamos a poder ver :

    - Prevencion del comportamiento por defecto del formulario
    - obtencion de valores del formulario 
    - creacion de una nueva tarea
    - solicitud POST a la API
    - reseteo del formulario
    - actualizacion de la lista de tareas 

5. Se modifico la `function deleteTask`. 

    Donde vamos a poder ver :

    - obtencion del id de la tarea a eiminar 
    - solicitud DELETE a la API
    - actualizacion de la lista de tareas

6. Se modifico los estilos css en styles.css


**RESULTADO FINAL**


![iamgen](https://i.ibb.co/tssPC22/Gestor-de-Tareas-localhost.png)

