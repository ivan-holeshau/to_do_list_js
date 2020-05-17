class Card {
    _divCard;

    constructor(id, text, finished) {
        let clas = 'my-card';
        if (finished)
            clas = 'my-card-finished';
        this._divCard = document.createElement('div');
        this.divCard.id = `div${id}`;
        this.divCard.className = ` card ${clas} `;
        let checkBox = document.createElement('input');
        checkBox.type = 'checkbox';
        checkBox.id = `check${id}`;
        checkBox.className = 'checkbox left';
        if (finished)
            checkBox.checked = 'true';
        let labelChekbox = document.createElement('label');
        labelChekbox.setAttribute("for", `check${id}`);
        let iButtonDelete = document.createElement('i');
        iButtonDelete.id = `i${id}`;
        iButtonDelete.className = 'fa fa-trash-o right fa-2x';
        let divText = document.createElement('div');
        divText.innerHTML = text;
        divText.className = 'center element-card';
        this.divCard.append(checkBox);
        this.divCard.append(labelChekbox);
        let span = document.createElement('span');
        span.className = 'spanvmiddle';
        this.divCard.append(divText);
        this.divCard.append(span);
        this.divCard.append(iButtonDelete);

    }
    get divCard() {
        return this._divCard;
    }
}

class TaskList {
    _listTask = [];

    set listTask(list) {

        if (list != null)
            list.map(item => {
                const {
                    id,
                    text,
                    finished
                } = item;
                this.createTask(item);
            });
        else
            this._listTask = [];
    }


    deleteTask(id) {
        let li = document.getElementById(`${id}`);
        let indexDeleteMass = this._listTask.findIndex(item => item.id == id);
        this._listTask.splice(indexDeleteMass, 1);
        li.remove();
        this.saveTask();
    }

    saveTask() {
        localStorage.setItem('list', JSON.stringify(this._listTask));
    }

    finishedTask(id) {
        let div = document.getElementById(`div${id}`);
        let index = this._listTask.findIndex(item => item.id == id);
        let s = this._listTask[index];
        this._listTask[index].finished = !this._listTask[index].finished;
        let clas = 'my-card';
        if (document.getElementById(`check${id}`).checked) {
            clas = 'my-card-finished';
        }
        div.className = `card ${clas}`;
        this.saveTask();
    }


    createTask({
        id,
        text,
        finished
    }) {

        let chek = false;
        let checkTextOfNull = false;
        if (text.trim().length > 0) {
            checkTextOfNull = true;
        }
        if (checkTextOfNull) {
            let li = document.createElement('li');
            li.style = ` 
            list-style-type: none; 
           `;
            li.id = id;
            let list = {
                id: id,
                text: text,
                finished: finished
            }
            li.append(new Card(id, text, finished).divCard);
            document.getElementById('list').append(li);
            this._listTask.push(list);
            localStorage.setItem('list', JSON.stringify(this._listTask));
        }
    }

    checkTaskOfNull(text) {
        if (text.trim().length > 0)
            return true;
        else return false;
    }

    createNewTask() {
        this.createTask({
            id: this._listTask.length,
            text: document.getElementById('task').value,
            finished: false,
        });

        document.getElementById('task').value = '';

    }
}

document.addEventListener('click', function(e) {
    if (e.target.id.indexOf('i') == 0)
        taskList.deleteTask(e.target.id.slice(1));
    if (e.target.id.indexOf('check') > -1)
        taskList.finishedTask(e.target.id.slice(5));
    if (e.target.className == 'btn-primary')
        taskList.createNewTask();
});

const taskList = new TaskList();
window.onload = function() {
    taskList.listTask = JSON.parse(localStorage.getItem('list'));
};