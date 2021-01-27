export default {
  // addCategory(title) {
  //   let categoryString = localStorage.getItem('categories');
  //   let category = JSON.parse(categoryString);
  //   if (category === null) {
  //     category = [];
  //   }
  //   category.push(title);
  //   localStorage.setItem('categories', JSON.stringify(category));
  //   return category;
  // },
  
  // getCategories() {
  //   return JSON.parse(localStorage.getItem('categories'));
  // },

  // removeCategory(categoryName) {
  //   let jsonCategories = JSON.parse(localStorage.getItem('categories'));
  //   const newData = jsonCategories.filter(
  //     (category) => category !== categoryName
  //   );
  //   localStorage.removeItem(`${categoryName}_notes`);
  //   localStorage.setItem('categories', JSON.stringify(newData));
  //   return newData;
  // },

  addNote({ tags, title, text, uuid, date }) {
    let notesString = localStorage.getItem(`notes`);
    let notes = JSON.parse(notesString);
    if (notes === null) {
      notes = [];
    }
    notes.push({ title, text, uuid, tags, date });
    localStorage.setItem(`notes`, JSON.stringify(notes));
    return notes;
  },

  getNotes() {
    return JSON.parse(localStorage.getItem(`notes`));
  },

  removeNote(uuid) {
    let jsonNotes = JSON.parse(localStorage.getItem(`notes`));
    const newData = jsonNotes.filter((note) => note.uuid !== uuid);
    localStorage.setItem(`notes`, JSON.stringify(newData));
    return newData;
  },

  updateNote(noteTags, uuid, textContent, noteTitle) {
    let jsonNotes = JSON.parse(localStorage.getItem(`notes`));
    jsonNotes.find((note) => note.uuid === uuid).text = textContent;
    jsonNotes.find((note) => note.uuid === uuid).title = noteTitle;
    jsonNotes.find((note) => note.uuid === uuid).tags = noteTags;

    localStorage.setItem(`notes`, JSON.stringify(jsonNotes));
    return jsonNotes;
  },
};
