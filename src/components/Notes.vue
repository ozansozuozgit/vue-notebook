<template>
  <div>
    <v-toolbar flat class="mb-5 justify-center d-flex" color="background">
      <v-dialog v-model="dialog" max-width="500">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="secondary darken-3" ripple v-bind="attrs" v-on="on">
            Create Note
          </v-btn>
        </template>
        <NoteForm />
      </v-dialog>
    </v-toolbar>
    <v-row class="notes_container">
      <v-col cols="12" sm="6" md="4" v-for="note in notes" :key="note.uuid">
        <Note :note="note" />
      </v-col>
    </v-row>
    <v-snackbar v-model="snackbar" :timeout="timeout">
      Note Deleted
      <template v-slot:action="{ attrs }">
        <v-btn
          light
          color="primary"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import dbService from "../services/db_service";
import { EventBus } from "../event-bus";

import Note from "./Note";
import NoteForm from "./NoteForm";

export default {
  name: "Notes",
  components: {
    Note,
    NoteForm,
  },
  data: () => {
    return {
      selectedListItem: 0,
      searchText: "",
      items: ["Newest", "Oldest"],
      selectedFilter: "",
      notes: [],
      dialog: false,
      snackbar: false,
      timeout: 2000,
    };
  },

  mounted() {
    EventBus.$on("deleteNote", (uuid) => {
      this.deleteNote(uuid);
    });
    EventBus.$on("removeNoteFromNoteList", (uuid) => {
      this.removeNoteFromList(uuid);
    });
    EventBus.$on("addNewNote", (note) => {
      this.addNewNote(note);
    });
    EventBus.$on("updateNote", (updatedValues) => {
      this.updateNote(updatedValues);
      this.closeNoteForm();
    });
    EventBus.$on("closeNoteForm", this.closeNoteForm);
    EventBus.$on("openNoteForm", this.openNoteForm);
    EventBus.$on("orderByNewest", this.orderByNewest);
    EventBus.$on("orderByOldest", this.orderByOldest);

    EventBus.$on("filterSearch", (searchInput) => {
      this.filterSearch(searchInput);
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
    deleteNote(uuid) {
      this.snackbar = true;
      dbService.removeNote(uuid);
      return (this.notes = this.notes.filter((note) => note.uuid !== uuid));
    },
    orderByNewest() {
      return this.notes.sort(function (a, b) {
        return new Date(b.date) - new Date(a.date);
      });
    },
    orderByOldest() {
      return this.notes.sort(function (a, b) {
        return new Date(a.date) - new Date(b.date);
      });
    },
    filterSearch(searchInput) {
      if (searchInput === "") {
        this.notes = dbService.getNotes();
        return;
      }
      this.notes = dbService.getNotes().filter((note) => {
        searchInput = searchInput.toLowerCase();
        return (
          note.text.toLowerCase().includes(searchInput) ||
          note.title.toLowerCase().includes(searchInput) ||
          note.tagList.some((tag) => {
            return tag.toLowerCase().includes(searchInput);
          })
        );
      });
    },
    updateNote({ tags, uuid, text, title, tagList, allImages }) {
      let noteToUpdate = this.notes.find((note) => note.uuid === uuid);
      Object.assign(noteToUpdate, { text, title, tagList, tags, allImages });
    },
    addNewNote(note) {
      return this.notes.push(note);
    },
    closeNoteForm() {
      return (this.dialog = false);
    },
    openNoteForm() {
      return (this.dialog = true);
    },
  },

  beforeDestroy() {
    EventBus.$off("removeNoteFromList", this.removeNoteFromList);
    EventBus.$off("updateNote", this.updateNote);
    EventBus.$off("addNewNote", this.addNewNote);
    EventBus.$off("closeNoteForm", this.closeNoteForm);
    EventBus.$off("openNoteForm", this.openNoteForm);
    EventBus.$off("orderByNewest", this.orderByNewest);
    EventBus.$off("orderByOldest", this.orderByOldest);
    EventBus.$off("filterSearch", this.filterSearch);
    EventBus.$off("deleteNote", this.deleteNote);
  },
};
</script>

<style lang="scss" >
.v-dialog--active {
  scrollbar-width: none;
}
.notes_container {
  border-left: 3px solid;
}
</style>