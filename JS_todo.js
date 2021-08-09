/* TODO Liste  */ 



//  function origin btnorigin ganz viel event.target --> evtl. mit variablen arbeiten 
// Haufig wird body __dark mode abgefragt evtl. in eine Funktion verpacken 
// Wenn ein reload geschieht Modus speichern -< im reload gleicher mode 


/* Imports  */

import * as Tools from "./modules/Functions.js";

/* DOM Selectors */

const mode_sun = document.querySelector(".App_title__sun"); 
const mode_moon = document.querySelector(".App_title__moon");
const body = document.querySelector("body");
const new_todo_inputfield = document.querySelector(".Input__field");
const list = document.querySelector(".list"); 
const list_fixed = document.querySelector(".list__fixed");

var new_todo_input = document.querySelector(".Input__input-field");
var all_entrys_fields = document.querySelectorAll(".list__field");

/* TODO Array */ 

var default_obj = [];

 /* [{Entry: "Tutorial Partner Wechselbeziehung aufbauen", State: "Open"},
                {Entry: "Portfolio", State: "Open"},    
                {Entry: "Code - Matrix", State: "Open"},
                {Entry: "News Ticker", State: "Open"}];   */
                               
var TODOS = [];

/* Local Storage */


TODOS = Tools.ChecklocalStorage(TODOS, default_obj);



/* TODO App */

function TODO_app(TODOS){

    Tools.render(TODOS, 0);

    /* Dark or Light Mode */ 

    mode_moon.addEventListener("click", Tools.mode_change);
    mode_sun.addEventListener("click", Tools.mode_change);

    /* List Delegation */ 

    list.addEventListener("click", changelist);
    list_fixed.addEventListener("click", changelist);

    /* New todo */ 

    new_todo_input.addEventListener("keyup", event =>{

        if(event.key == "Enter" && new_todo_input.value != ""){

            TODOS.unshift({Entry: new_todo_input.value, State: "Open"});
            new_todo_input.value = "";
            Tools.render(TODOS, 0);

        }

    });

    function changelist(event){

        var items_left = document.querySelectorAll(".Items_left");
        var set = 0;

        if(event.target.matches(".list__btn--gradient")){

            TODOS = Tools.btnclicked(event, TODOS);
            set = 1;
            Tools.render(TODOS, 0);
            
        }

        if(event.target.matches(".list__btn--gradientdark")){

            TODOS = Tools.btnclicked(event, TODOS);
            set = 1;
            Tools.render(TODOS, 0);

        }

        if((event.target.matches(".list__btn--onclick") || event.target.matches(".list__btn--activ")) && (set == 0)){

            TODOS = Tools.btn_origin(event, TODOS);
            set = 1;
            Tools.render(TODOS, 0);
            
        }

        if(event.target.matches(".list__marker")){

            TODOS = Tools.removeItem(event, TODOS);
            Tools.render(TODOS, 0);

        }

        if(event.target.matches(".list__textlast")){

            TODOS = TODOS.filter(todo => (todo.State == "Open"));
            Tools.render(TODOS, 0);

        }

        if(event.target.matches(".list__text-liststatus")){

            if(event.target.innerText == "All"){

                Tools.render(TODOS, 0);
                items_left.innerText = TODOS.length;

            }

            if(event.target.innerText == "Active"){

                let activ = "Activ";
                for(let item of items_left){

                    item.innerHTML = Tools.reducer(TODOS, "Open");
                    
                }
                Tools.render(TODOS, activ);
                
            }

            if(event.target.innerText == "Completed"){
                
                let completed = "Completed";
                for(let item of items_left){

                    item.innerText = Tools.reducer(TODOS, "Finished");
    
                }
                Tools.render(TODOS, completed);

            }

            if(event.target.innerText == "Clear Completed"){
                
                TODOS = TODOS.filter(todo => (todo.State == "Open"));
                Tools.render(TODOS, 0);

            }

        }

        set = 0;

    }

} 

/* Serverside read/save async/await */
 
const todos_server = await Tools.getodos_await();
if(todos_server != 0){
    TODOS = todos_server;
    TODO_app(TODOS);
}else{
    const settodos = await Tools.settodos_await(TODOS);
    if(settodos != 0){
        TODO_app(TODOS);
    }else{
        TODO_app(TODOS);
    }

}




/* Serverside read/save 

const settodos = () => {
    Tools.setTodos_fetch(TODOS, TODO_app);
};


Tools.getTodos_fetch(settodos, TODO_app(TODOS));
*/






 
