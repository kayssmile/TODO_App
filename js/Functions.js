
async function getodos_await(){

    try{

        const response =  await fetch("http://localhost:3000/getsql_todosapp");
        
        if(response.status == 200){

            return await response.json(); 

        }
        else{
            console.log("booee");
        }
    }
    catch (error){
        console.log(`ServerProblem: ${error}`);
        return 0;
    }
}

async function Deletetodos_await(data){
    
    try{
        const response = await fetch("http://localhost:3000/deletesql_todosapp",{
                        method: "DELETE",
                        headers: {
                                 "Content-Type": "application/json",
                        },
                        body: JSON.stringify(data),
                    })
        return await response.json();            
    }
    catch (error){
        console.log(error);
    }

}

async function updatetodos_await(data){
    
    try{
        const response = await fetch("http://localhost:3000/updatesql_todosapp",{
                        method: "PUT",
                        headers: {
                                 "Content-Type": "application/json",
                        },
                        body: JSON.stringify(data),
                    })
        return await response.json();            
    }
    catch (error){
        console.log(error);
    }

}

async function settodos_await(data){
    
    try{
        const response = await fetch("http://localhost:3000/newsql_todosapp",{
                        method: "POST",
                        headers: {
                                 "Content-Type": "application/json",
                        },
                        body: JSON.stringify(data),
                    })
        
        return  await response.json();

    } 
    catch (error){
            console.log(error);
    }

}

function getTodos_fetch(callback, callback1){

    fetch("http://localhost:3002/todos")
    
    .then((response) =>{
        console.log("Eintraege werden abgerufen");
        console.log(response.status);
        if(response.ok){

            return response.json();

        }else{

            throw new Error(response.status);

        }
        
    })
    .then((antwort) =>{

        if(Object.keys(antwort).length === 0){

           return callback1;

        }

        return callback(antwort);

    })
    .catch((Error) =>{

        console.log(Error);
        return callback1;

    })

}

function setTodos_fetch(TODOS, callback){
    fetch("http://localhost:3002/todos", {

        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(TODOS),
      })

    .then((response) =>{
        console.log("ein neuer eintrag wird gespeichert");
        if(!response.ok){

            throw new Error(response.status);

        }
        if(response.ok){

            return response.json();

        }

    })
    .then((antwort) =>{

        if(Object.keys(antwort).length === 0){
            console.log("unmoeglich");
         }
         return callback(antwort);
     
    })
    .catch((Error) =>{
        console.log(Error);
    })
    
}

function getTodos(mycallback){

    var request = new XMLHttpRequest;
    request.open("GET", "http://localhost:3002/todos", true);
    console.log("eintraege werden abgerufen");
    request.onload = function(){
    
        if(request.status >= 200 && request.status < 400){
    
            var TODOS = JSON.parse(request.responseText);
            return mycallback(TODOS);
            
        }
        else{
    
            console.log(request.status);
            
        }
    
    }

    request.send();
    
}

function setTodos(TODOS, callback){

    let request = new XMLHttpRequest();
    request.open("POST", "http://localhost:3002/todos", true);
    request.setRequestHeader("Content-Type", "application/JSON");
    var data = JSON.stringify(TODOS);

    request.onload = function(){
      
      if(request.status >= 200 && request.status < 400){

        let daten = JSON.parse(request.responseText);
        return callback(daten);

      }
      else{

        console.log("Server meldet fehler");
        
      }

    }

    request.send(data);

}

function ChecklocalStorage(TODOS, default_entries){

    if(localStorage.getItem("TODOS") && localStorage.getItem("TODOS") != "[]"){

        TODOS = JSON.parse((localStorage.getItem("TODOS")));
    
    }else{
    
        let default_obj = JSON.stringify(default_entries);
        localStorage.setItem("TODOS", default_obj);
        TODOS = JSON.parse((localStorage.getItem("TODOS")));
    
    }

    return TODOS;
}

function reducer(TODOS, State){

  var items = TODOS.reduce(function(start, zahl){
                
        if(zahl.State == State){
            zahl = 1;
        }else{
            zahl = 0;
        }
        return start + zahl;

    }, 0);

    return items;

}

function render(TODOS, filter){

    var all_entrys_fields = document.querySelectorAll(".list__field");
    const list = document.querySelector(".list");
    const items_left = document.querySelectorAll(".Items_left"); 
    const body = document.querySelector("body");

    list.innerHTML= "";
    let count = 0; 

    if(filter == 0){

        for (let item of items_left){

            item.innerText = TODOS.length;
    
        }

    }
        
    for(let todo of TODOS){

        if(filter == "Activ" && todo.State == "Finished" ){
 
            continue;

        }

        if(filter == "Completed" && todo.State == "Open" ){

            continue;

        }

        count++;
        if(count == 1){

            var div_outer = document.createElement("div");
            div_outer.classList.add("list__field", "list__field--list-first");
            div_outer.setAttribute("data-index", count);

        }else{

            var div_outer = document.createElement("div");
            div_outer.classList.add("list__field", "list__field--listing");
            div_outer.setAttribute("data-index", count);

        }

        if(body.classList.contains("body__darkmode")){

            div_outer.style.backgroundColor = "hsl(235, 24%, 19%)";

        }
        
        if(todo.State == "Finished"){

            var div_inner1 = document.createElement("div");
            div_inner1.classList.add("list__btn--noborder");

            var div_inner1_inner = document.createElement("div");
            div_inner1_inner.classList.add("list__btn--onclick");

            var span = document.createElement("span");
            span.classList.add("list__btn--activ");
            span.innerHTML = "&#10004";

            div_inner1_inner.appendChild(span);

            var Eintrag = document.createElement("p");
            Eintrag.classList.add("list__text", "list__text--finished");
            Eintrag.innerText = todo.Entry;

        }else{

            var div_inner1 = document.createElement("div");
            div_inner1.classList.add("list__btn");
    
            var div_inner1_inner = document.createElement("div");
            if(body.classList.contains("body__darkmode")){

                div_inner1_inner.classList.add("list__btn--gradientdark");
    
            }else{

                div_inner1_inner.classList.add("list__btn--gradient");

            }

            var Eintrag = document.createElement("p");
            Eintrag.classList.add("list__text");
            Eintrag.innerText = todo.Entry;

        }
        
        let div_inner2 = document.createElement("div");
        div_inner2.classList.add("list__text--center");

        let delete_item = document.createElement("span");
        delete_item.classList.add("list__marker");
        delete_item.innerHTML = "&#10006";

        div_inner1.appendChild(div_inner1_inner);
        div_inner2.appendChild(Eintrag);

        div_outer.appendChild(div_inner1);
        div_outer.appendChild(div_inner2);
        div_outer.appendChild(delete_item);

        list.appendChild(div_outer);

    }

    let TODOS_local = JSON.stringify(TODOS);
    localStorage.setItem("TODOS", TODOS_local);
  //  settodos_await(TODOS); // Wird beim einlesen eines neuen Eintrages in Datenbank geschrieben 

    /*  
    setTodos_fetch(TODOS, () =>{

    });
    */
    
}

function removeItem(event, TODOS){

    let index = event.target.parentNode.getAttribute("data-index");
    let data = TODOS[index - 1];
    Deletetodos_await(data);

    TODOS.splice(index - 1, 1);
    event.target.parentNode.remove();

    return TODOS;

}

function mode_change(){

    var all_entrys_fields = document.querySelectorAll(".list__field"); 
    const body = document.querySelector("body");
    const new_todo_inputfield = document.querySelector(".Input__field");
    const new_todo_input = document.querySelector(".Input__input-field");
    const color_night = "hsl(235, 24%, 19%)";

    document.body.classList.toggle("body__darkmode");
    var btn_background_all;
    var btn_background_input;

    if(body.classList.contains("body__darkmode")){

        btn_background_input = document.querySelector(".Input__btn--gradient");
        btn_background_input.classList.remove("Input__btn--gradient");
        btn_background_input.classList.add("Input__btn--gradientdark");
        btn_background_all = document.querySelectorAll(".list__btn--gradient");
        
        for (let btn_background of btn_background_all){

            btn_background.classList.remove("list__btn--gradient");
            btn_background.classList.add("list__btn--gradientdark");
        }

        new_todo_inputfield.style.backgroundColor = color_night;
        new_todo_input.style.backgroundColor = color_night;

        for(let entry_field of all_entrys_fields ){

            entry_field.style.backgroundColor = color_night;

        }

    }else{

        btn_background_input = document.querySelector(".Input__btn--gradientdark");
        btn_background_input.classList.remove("Input__btn--gradientdark");
        btn_background_input.classList.add("Input__btn--gradient");   
        btn_background_all = document.querySelectorAll(".list__btn--gradientdark");
        
        for (let btn_background of btn_background_all){

            btn_background.classList.remove("list__btn--gradientdark");
            btn_background.classList.add("list__btn--gradient");
            
        }

        new_todo_inputfield.style.backgroundColor = "white";
        new_todo_input.style.backgroundColor = "white";

        for(let entry_field of all_entrys_fields ){

            entry_field.style.backgroundColor = "white";

        }

    }

}

function btnclicked(event, TODOS){

    let index = event.target.parentNode.parentNode.getAttribute("data-index");
    TODOS[index - 1].State = "Finished";
    let data = TODOS[index - 1];
    updatetodos_await(data);

    
    event.target.parentNode.classList.remove("list__btn");
    event.target.parentNode.classList.add("list__btn--noborder");

    event.target.classList.remove("list__btn--gradient");
    event.target.classList.remove("list__btn--gradientdark");

    event.target.classList.add("list__btn--onclick");
    
    let span = document.createElement("span");
    span.classList.add("list__btn--activ");
    span.innerHTML = "&#10004";

    event.target.appendChild(span);
    event.target.parentNode.parentNode.children[1].children[0].classList.add("list__text--finished");

    return TODOS; 

}

function btn_origin(event, TODOS){

    const body = document.querySelector("body");
    

    if(event.target.classList.contains("list__btn--onclick")){

        let index = event.target.parentNode.parentNode.getAttribute("data-index");
        TODOS[index - 1].State = "Open";
        let data = TODOS[index - 1];
        updatetodos_await(data);

        event.target.parentNode.parentNode.children[1].children[0].classList.remove("list__text--finished");
        event.target.parentNode.classList.remove("list__btn--noborder");
        event.target.parentNode.classList.add("list__btn");
        event.target.classList.remove("list__btn--onclick");
    
        if(body.classList.contains("body__darkmode")){
    
            event.target.classList.add("list__btn--gradientdark");
    
        }else{
    
            event.target.classList.add("list__btn--gradient");
    
        }
        
        event.target.innerHTML = "";

    }else{
        
        let index = event.target.parentNode.parentNode.parentNode.getAttribute("data-index");
        TODOS[index - 1].State = "Open";
        let data = TODOS[index - 1];
        updatetodos_await(data);
            
        event.target.parentNode.parentNode.parentNode.children[1].children[0].classList.remove("list__text--finished");
        event.target.parentNode.parentNode.classList.remove("list__btn--noborder");
        event.target.parentNode.parentNode.classList.add("list__btn");
        event.target.parentNode.classList.remove("list__btn--onclick");

        if(body.classList.contains("body__darkmode")){

            event.target.parentNode.classList.add("list__btn--gradientdark");

        }else{

            event.target.parentNode.classList.add("list__btn--gradient");

        }
        
        event.target.parentNode.innerHTML = "";

    }  
    
    return TODOS;

}

export {mode_change, btnclicked, btn_origin,
        removeItem, render, ChecklocalStorage,
        setTodos, getTodos, reducer, getTodos_fetch,
        setTodos_fetch, getodos_await, settodos_await,
        Deletetodos_await};