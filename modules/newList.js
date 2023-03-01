import updateStatus from './updateStatus.js';
import TodoList from './todoList.js';
import resetItem from './resetItem.js';
import mainTodo from './mainTodo.js';

const newList = (todo, list) => {
  if (todo.hasChildNodes()) {
    todo.innerHTML = '';
  }

  // display all todo List items
  mainTodo(todo);
  const methods = new TodoList(list);

  if (list.length > 0) {
    list.forEach((item) => {
      const {
        description,
      } = item;

      const template = document.createElement('template');
      if (item.completed) {
        template.innerHTML = `<li><span class="main complete"><p class="no inactive">${item.index}</p><input type="checkbox" checked><div><label class="textlabel">${description}</label><textarea class="edit inactive">${description}</textArea></div></span><span class="options"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
        <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
        </svg></span></li>`.trim();
      } else {
        template.innerHTML = `<li><span class="main"><p class="no inactive">${item.index}</p><input type="checkbox"><div><label class="textlabel">${description}</label><textarea class="edit inactive">${description}</textArea></div></span><span class="options"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
        <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
        </svg></span></li>`.trim();
      }
      todo.appendChild(template.content.firstElementChild);
    });
    const li = document.createElement('li');
    const a = li.appendChild(document.createElement('a'));
    a.href = '/';
    a.innerText = 'Clear all Completed';
    a.classList.add('btn');
    todo.appendChild(li);

    a.addEventListener('click', (e) => {
      e.preventDefault();
      list = methods.removeItem();
      localStorage.setItem('listData', JSON.stringify(list));
      newList(todo, list);
    });

    const check = todo.querySelectorAll('input[type="checkbox"]');
    const options = document.querySelectorAll('.options');

    // change status to complete/incomplete
    updateStatus(check, list);
    options.forEach((option) => {
      const par = option.parentElement;
      option.addEventListener('click', () => {
        option.classList.add('inactive');
        const opt = document.createElement('span');
        opt.classList.add('optcard');
        par.appendChild(opt);
        const p1 = opt.appendChild(document.createElement('p'));
        p1.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
          <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
        </svg>`;
        const p2 = opt.appendChild(document.createElement('p'));
        p2.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
          <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
        </svg>`;
        // edit description
        p1.addEventListener('click', () => {
          const pElem = p1.parentElement.parentElement;
          const label = pElem.querySelector('.textlabel');
          const iElem = Number(pElem.querySelector('.no').innerText);
          label.classList.add('inactive');
          const text = pElem.querySelector('.edit');
          text.classList.remove('inactive');
          p1.classList.add('inactive');
          text.focus();
          pElem.classList.add('changeback');
          text.classList.add('changeback');
          text.addEventListener('keypress', (e) => {
            if (e.code === 'Enter') {
              if (text.value) {
                pElem.classList.remove('changeback');
                text.classList.remove('changeback');
                text.classList.add('inactive');
                label.classList.remove('inactive');
                list.forEach((item) => {
                  if (item.description === label.innerText && item.index === iElem) {
                    item.description = text.value.trim();
                    localStorage.setItem('listData', JSON.stringify(list));
                    newList(todo, list);
                  }
                });
              } else {
                text.focus();
              }
            }
          });
        });

        // delete list item
        p2.addEventListener('click', () => {
          list.filter((val, ind, arr) => {
            if (val.description === par.querySelector('span').innerText && val.index === ind + 1) {
              arr.splice(ind, 1);
              return true;
            }
            return false;
          });

          // reset indices of all elements
          resetItem(list);
          newList(todo, list);
        });
      });
    });
  }

  // different button events
  const refresh = document.querySelector('.refresh');
  const add = document.querySelector('.add');
  const enter = document.querySelector('.enter');

  // add element to list on keypress
  add.addEventListener('keypress', (event) => {
    if (event.code === 'Enter') {
      methods.addItem(add.value);
      newList(todo, list);
    }
  });

  // add element to list on button click
  enter.addEventListener('click', () => {
    methods.addItem(add.value);
    newList(todo, list);
  });

  // refresh page
  refresh.addEventListener('click', () => {
    window.location.reload();
  });
};

export default newList;
