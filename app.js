//select the elements
const clear= document.querySelector('.clear');
const dateElement = document.querySelector('#date');
const list= document.querySelector('#list');
const input= document.querySelector('#input');

//classes names
const CHECK = 'fa-check-circle';
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = 'lineThrough';

//variables
let LIST, id;

//get item from store
let data = localStorage.getItem("TODO");

//CHECK if the data is empty
if(data){
   LIST = JSON.parse(data);
   id = LIST.length;
   loadList(LIST);

}
else{
   LIST;
   id;
}

//load item to the user's interface
function loadList(array){
    array.forEach(function(item){
        addToDo(item.name, item.id, item.done, item.trash);
    });
}
//clear bottom
clear.addEventListener("click", function(){
   localStorage.clear();
   location.reload();
});

// show date
const options = {weekday :'long', month:"short",day:"numeric"};
const today = new Date();
dateElement.innerHTML = today.toLocaleDateString("en-US",options);


//add to do function
function addToDo(toDo, id,done,trash){

    if(trash){return;}

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";

    const item =`<li class='item'>
        <i class="fa ${DONE} co" job='complete' id='${id}'></i>
        <p class="text ${LINE}">${toDo}</p>
        <i class='fa fa-trash-o de' job='delete' id="${id}"></i>
                    </li> `;

    const position = "beforeEnd";
    list.insertAdjacentHTML(position, item);

}
//add an item to the list user the enter key

document.addEventListener("keyup",function(even){
    if (event.keyCode == 13){
        const toDo =input.value;
        if(toDo){
            addToDo(toDo, id, false, false);

            LIST.push({
                name: toDo,
                id: id,
                done: false,
                trash: false
            });

            //add item to Store (this code must be added where the LIST array is updated)
            localStorage.setItem("TODO", JSON.stringify(LIST));

            id++
        }
        input.value = "";
    }
});

//Function compleate to do

function completeToDo(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.classList.querySelector(".text").classList.toggle(LINE_THROUGH);

    LIST[element.id].done = LIST[element.id].done ? false : true;
    


}

//remove function

function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id].trash = true;
}
//target the item created dynamically

list.addEventListener('click',function(event){
    const element = event.target; //return the clicked element inside list
    const elementJob = element.attributes.job.value; //compleate or delete

    if(elementJob == "complete"){
        completeToDo(element);
    }
    else if(elementJob == "delete"){
        removeToDo(element);
    }
    //add item to Store (this code must be added where the LIST array is updated)
    localStorage.setItem("TODO", JSON.stringify(LIST));

});