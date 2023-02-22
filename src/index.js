// Import CSS and the createList function
import './style.css';
import displayList from '../modules/createList.js';

// Get the DOM element where the list will be displayed
const todoList = document.querySelector('.to-do');

// Define the list of items to display
const itemList = [
  {
    description: 'Wash The Dishes',
    completed: false,
    index: 1,
  },
  {
    description: 'Cleaning ',
    completed: false,
    index: 2,
  },
  {
    description: 'Cooking',
    completed: false,
    index: 3,
  },
];

// Display the list of items
displayList(todoList, itemList);
