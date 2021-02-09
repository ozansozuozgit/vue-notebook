<template>
  <div>
    <v-toolbar color="orange " light class="mb-5">
      <v-toolbar-title>Notes</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="500">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="#faa307"
            fab
            shaped
            small
            ripple
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </template>
        <NoteForm />
      </v-dialog>
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
    };
  },

  mounted() {
    EventBus.$on("removeNoteFromNoteList", (uuid) => {
      this.removeNoteFromList(uuid);
    });
    EventBus.$on("addNewNote", (note) => {
      console.log(note);
      this.addNewNote(note);
    });
    EventBus.$on("updateNote", (updatedValues) => {
      this.updateNote(updatedValues);
    });
    EventBus.$on("closeDialog", () => {
      this.closeDialog();
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
    addNewNote(note) {
      return this.notes.push(note);
    },
    closeDialog() {
      return (this.dialog = false);
    },
  },

  beforeDestroy() {
    EventBus.$off("removeNoteFromList", this.removeNoteFromList);
    EventBus.$off("updateNote", this.updateNote);
    EventBus.$off("addNewNote", this.addNewNote);
    EventBus.$off("closeDialog", this.closeDialog);
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
.v-dialog--active {
  scrollbar-width: none;
}
</style>