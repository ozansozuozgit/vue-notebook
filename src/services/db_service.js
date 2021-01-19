export default {
  update_category(uuid, data) {
    let categoryString = localStorage.getItem(uuid);
    let category = JSON.parse(categoryString);
    let newData = Object.assign({}, category, data);
    localStorage.setItem(uuid, JSON.stringify(newData));
    return newData;
  },
  add_category(data) {
    let categoryString = localStorage.getItem('categories');
    let category = JSON.parse(categoryString);
    let newData = {...category, ...data};
    localStorage.setItem('categories', JSON.stringify(newData));
    return newData;
  },
  remove_category(uuid) {
    localStorage.removeItem(uuid);
  },
  add_note(uuid,title,text){
    console.log(title,uuid,text);
  }
};
