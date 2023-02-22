import resetIndex from './resetItem.js';

export default class TodoList {
  constructor(list) {
    this.list = list;
  }

  addItem(value) {
    if (value) {
      value = value.trim();
      const ind = this.list.length + 1;
      const listItem = {
        description: value,
        completed: false,
        index: ind,
      };
      this.list.push(listItem);
      localStorage.setItem('listData', JSON.stringify(this.list));
    }
  }

  removeItem() {
    this.list = this.list.filter((elem) => !elem.completed);
    resetIndex(this.list);
    return this.list;
  }
}
