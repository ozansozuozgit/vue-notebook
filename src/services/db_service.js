export default {
  update_category(uuid, data) {
    let categoryString = localStorage.getItem(uuid);
    let category = JSON.parse(categoryString);
    let newData = Object.assign({}, category, data);
    localStorage.setItem(uuid, JSON.stringify(newData));
    return newData;
  },
  add_category(uuid, data) {
    localStorage.setItem(uuid, JSON.stringify(data));
  },
  remove_category(uuid) {
    localStorage.removeItem(uuid);
  },
};
