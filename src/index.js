import createList from '../modules/newList.js';
import './style.css';

// Retrieve the list data from local storage
const list = JSON.parse(localStorage.getItem('listData')) || [];

// Render the list in the todo element
const todo = document.querySelector('.to-do');
createList(todo, list);
