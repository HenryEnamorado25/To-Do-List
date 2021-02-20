const date = document.querySelector('#date');
const list = document.querySelector("#list");
const input = document.querySelector('#input');

const UNCHECK ='fa-circle-thin' ;
const CHECK ='fa-check-circle';
const LINE ='lineThrough';


let LIST = [], id = 0;

today = new Date();
options = {weekday : 'long', month: 'short', day:'numeric'}
date.innerHTML = today.toLocaleDateString('en-us', options);

const addToDo = (toDo, id, trash, done) => {
 const item = `<li class='item'>
                    <i class="fa fa-circle-thin co" job='complete' id='${id}'></i>
                    <p class="text">${toDo}</p>
                    <i class='fa fa-trash-o de' job='delete' id="${id}"></i>
                </li>`;
    list.insertAdjacentHTML('beforeend', item);
}

input.addEventListener('keyup', () => {
    if (event.keyCode == 13) {
        const toDo = input.value;
        if (toDo) {
            addToDo(toDo,id,false,false);
            LIST.push({
                name: toDo,
                id: id,
                trash: false,
                done: false
            })
            input.value = "";
            
        }
        id++;
    }
})


const addList = (element) => {
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    //LIST[element.id].done
}
const removeList = (element) => {
    element.parentNode.parentNode.removeChild(element);
    console.log(element.parentNode.parentNode);
}
list.addEventListener('click', () => {
    const element = event.target
    const elementJob = element.attributes.job.value;
    console.log(element.nextChild);

    console.log(elementJob, 'hello');
    if (elementJob === "complete") {
        addList(element);
    }
    if (elementJob === "delete") {
        removeList(element);
    }
})




