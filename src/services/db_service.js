export default {
  addNote({ tags, title, text, uuid, date,tagList }) {
    let notesString = localStorage.getItem(`notes`);
    let notes = JSON.parse(notesString);
    notes.push({ title, text, uuid, tags, date,tagList });
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

  updateNote({tags, uuid, text, title,tagList}) {
    let jsonNotes = JSON.parse(localStorage.getItem(`notes`));
  
    Object.assign(
      jsonNotes.find((note) => note.uuid === uuid),
      {
        text,
        title,
        tagList,
        tags,
      }
    );
    
    localStorage.setItem(`notes`, JSON.stringify(jsonNotes));
    return jsonNotes;
  },
};
