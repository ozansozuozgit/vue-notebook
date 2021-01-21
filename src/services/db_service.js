export default {
 
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
  addNote({category,title,text,uuid,date}){
    let notesString = localStorage.getItem(`${category}_notes`);
    let notes = JSON.parse(notesString);
    if(notes === null){ notes = [];}
    notes.push({title,text,uuid,category,date});
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
  updateNote(category,uuid,textContent,noteTitle){
    let jsonNotes = JSON.parse(localStorage.getItem(`${category}_notes`));
    jsonNotes.find(note=>note.uuid === uuid).text = textContent;
    jsonNotes.find(note=>note.uuid === uuid).title = noteTitle;
    localStorage.setItem(`${category}_notes`, JSON.stringify(jsonNotes));
    return jsonNotes;
  }
};
