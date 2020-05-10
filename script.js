let listCache = [];

function createCard(id, text, finished) {
  let clas = " my-card";
  if (finished)
    clas = " my-card-finished";
  let divCard = document.createElement('div');
  divCard.id = `div${id}`;
  divCard.className = ` card ${clas} `;

  let checkBox = document.createElement('input');
  checkBox.type = "checkbox";
  checkBox.id = `check${id}`;
  checkBox.className = 'checkbox left';
  if (finished)
    checkBox.checked = 'true';
  let iButtonDelete = document.createElement('i');
  iButtonDelete.id = `i${id}`;
  iButtonDelete.className = 'fa fa-trash-o right fa-2x';

  let divText = document.createElement('div');
  divText.innerHTML = text;
  divText.className = "center element-card";


  divCard.append(checkBox);
  let span = document.createElement('span');
  span.className = 'spanvmiddle';

  divCard.append(divText);
  divCard.append(span);
  divCard.append(iButtonDelete);

  //divCard.append(divDelete);
  return divCard;
}


document.addEventListener('click', function (e) {
  console.log(e.target.id);
  if (e.target.id.indexOf('i') == 0)
    deleteTask(e.target.id.slice(1));
  if (e.target.id.indexOf('check') > -1)
    finishedTask(e.target.id.slice(5));
});



let countIdElement = 0;

function onLoad() {

  listCache = JSON.parse(localStorage.getItem('list'));
  if (listCache != null)
    listCache.map(item => {
      const {
        id,
        text,
        finished
      } = item;
      addTaskNew(item);
    });
  else
    listCache = [];


}

function addTaskNew({
  id,
  text,
  finished
}) {


  let chek = false;
  if (!id) {
    id = ++countIdElement;
    text = document.getElementById('task').value;
    document.getElementById('task').value = '';
    chek = true;
    finished = false;
  }

  let checkTextOfNull = false;
  if (text.trim().length > 0) {
    checkTextOfNull = true;
    //alert(checkTextOfNull)
  }

  if (checkTextOfNull) {
    let li = document.createElement('li');

    li.style = ` 
        list-style-type: none; 
       `;
    li.id = id;

    list = {
      id: id,
      text: text,
      finished: finished
    }

    // li.innerHTML = createCard(id, text, finished);
    li.append(createCard(id, text, finished));
    document.getElementById('list').append(li);

    if (chek) {
      listCache.push(list);
      localStorage.setItem('list', JSON.stringify(listCache));

    } else {
      countIdElement = ++id;
    }
  }

}


function deleteTask(id) {
  let li = document.getElementById(`${id}`);
  let indexDeleteMass = listCache.findIndex(item => item.id == id);
  listCache.splice(indexDeleteMass, 1);
  li.remove();
  localStorage.setItem('list', JSON.stringify(listCache));
}

function finishedTask(id) {
  let div = document.getElementById(`div${id}`);


  let index = listCache.findIndex(item => item.id == id);
  let s = listCache[index];
  listCache[index].finished = !listCache[index].finished;
  let clas = 'my-card';

  if (document.getElementById(`check${id}`).checked) {
    clas = 'my-card-finished';
  }

  div.className = `card ${clas}`;

  localStorage.setItem('list', JSON.stringify(listCache));
}

