<template>
  <div>
    <v-toolbar color="orange " light class="mb-5">
      <v-toolbar-title>Notes</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn color="#faa307" fab @click="createNewNote" shaped small ripple>
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-toolbar>
    <v-row>
      <v-col sm="6" md="4" v-for="note in notes" :key="note.uuid">
        <Note :note="note" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import dbService from "../services/db_service";
import { EventBus } from "../event-bus";

import Note from "./Note";
import { v4 as uuidv4 } from "uuid";

export default {
  name: "Notes",

  data: () => {
    return {
      selectedListItem: 0,
      searchText: "",
      items: ["Newest", "Oldest"],
      selectedFilter: "",
      notes: [],
    };
  },
  components: {
    Note,
  },
  mounted() {
    EventBus.$on("removeNoteFromNoteList", (uuid) => {
      this.removeNoteFromList(uuid);
    });
    EventBus.$on("addNewNote", (note) => {
      this.addNewNote(note);
    });
    EventBus.$on("updateNote", (updatedValues) => {
      this.updateNote(updatedValues);
    });

    const allNotes = dbService.getNotes();
    if (allNotes === null) {
      localStorage.setItem("notes", JSON.stringify(this.notes));
      return;
    }
    this.notes = allNotes;
    localStorage.setItem("notes", JSON.stringify(this.notes));
  },
  methods: {
    updateNote({ tags, uuid, text, title, tagList }) {
      let noteToUpdate = this.notes.find((note) => note.uuid === uuid);
      Object.assign(noteToUpdate, { text, title, tagList, tags });
    },
    createNewNote() {
      const uuid = uuidv4();
      const newNote = {
        title: '',
        text: '',
        uuid,
        date: new Date().toLocaleString(),
      };
      this.notes.push(newNote);
      dbService.addNote(newNote);
    },
  },

 
  beforeDestroy() {
    EventBus.$off("removeNoteFromList", this.removeNoteFromList);
    EventBus.$off("updateNote", this.updateNote);
    EventBus.$off("addNewNote", this.addNewNote);
  },
};
</script>

<style lang="scss" >
.filter__toolbar {
  display: flex;
}
.select_container {
  flex: 0.4;
}
.search_container {
  flex: 0.6;
}
.filter__toolbar > .v-toolbar__content {
  height: 100% !important;
  padding: 0px !important;
}
</style>