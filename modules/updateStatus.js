export default function addCheckboxEventListeners(checkboxes, list) {
  checkboxes.forEach((checkbox) => {
    const { parentElement } = checkbox;
    const index = Number(parentElement.querySelector('.no').innerText);

    checkbox.addEventListener('click', () => {
      const item = list.find(
        (item) => item.description === parentElement.innerText && item.index === index,
      );

      if (item) {
        parentElement.classList.toggle('complete');
        item.completed = !item.completed;
        localStorage.setItem('listData', JSON.stringify(list));
      }
    });
  });
}
