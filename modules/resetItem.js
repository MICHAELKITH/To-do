const resetIndex = (temp) => {
  if (temp) {
    temp.forEach((item, index) => {
      item.index = index + 1;
    });
    localStorage.setItem('listData', JSON.stringify(temp));
  }
};
module.exports = resetIndex;
