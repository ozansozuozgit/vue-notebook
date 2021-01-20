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
  removeCategory(categoryName) {
    let jsonCategories = JSON.parse(localStorage.getItem("categories"));
    const newData = jsonCategories.filter(category => category !== categoryName);
    localStorage.setItem('categories', JSON.stringify(newData));
    return newData;
  },
  addNote(category,title,text,uuid){
    let notesString = localStorage.getItem(`${category}_notes`);
    let notes = JSON.parse(notesString);
    if(notes === null){ notes = [];}
    notes.push({title,text,uuid,category});
    localStorage.setItem(`${category}_notes`, JSON.stringify(notes));
    return notes;
  },
  getNotes(category){
    return JSON.parse(localStorage.getItem(`${category}_notes`));
  },
  removeNote({uuid,category}){
    let jsonNotes = JSON.parse(localStorage.getItem(`${category}_notes`));
    const newData = jsonNotes.filter(note => note.uuid !== uuid);
    localStorage.setItem(`${category}_notes`, JSON.stringify(newData));
    return newData;
  },
  updateNote(category,uuid,text){
    let jsonNotes = JSON.parse(localStorage.getItem(`${category}_notes`));
    console.log(jsonNotes);

    let note = jsonNotes.find(note=>note.id === uuid);
    console.log(note)
    console.log(text);
  }
};
