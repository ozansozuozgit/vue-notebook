export default {
  update_category(uuid, data) {
    let categoryString = localStorage.getItem(uuid);
    let category = JSON.parse(categoryString);
    let newData = Object.assign({}, category, data);
    localStorage.setItem(uuid, JSON.stringify(newData));
    return newData;
  },
  addCategory(title) {
    let categoryString = localStorage.getItem('categories');
    let category = JSON.parse(categoryString);
    if(category === null){ category = [];}
    category.push(title);
    localStorage.setItem('categories', JSON.stringify(category));
    return category;
  },
  getCategories(){
    return JSON.parse(localStorage.getItem("categories"));

  },
  remove_category(categoryName) {
    // localStorage.removeItem();
    let jsonCategories = JSON.parse(localStorage.getItem("categories"));
    console.log(jsonCategories);
    // const entries = Object.entries(jsonCategories);
    // const keys = Object.keys(jsonCategories);

    const newData = jsonCategories.filter(category => category !== categoryName);
    // console.log(keys);
    // console.log(entries);
    // console.log(newData);
    // console.log(JSON.stringify(newData));
    
    localStorage.setItem('categories', JSON.stringify(newData));
    return newData;
  },
  add_note(uuid,title,text){
    console.log(title,uuid,text);
  }
};
