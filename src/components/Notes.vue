<template>
  <v-col cols="4">
    <v-toolbar
      class="mb-2 pa-2 filter__toolbar"
      rounded
      height="50px"
      color="orange darken-3"
      light
    >
      <v-select
        :items="items"
        label="Filter By"
        @change="sortBy()"
        v-model="selectedFilter"
        single-line
        hide-details
        flat
        rounded
        class="select_container"
      ></v-select>
      <v-text-field
        hide-details
        append-icon="mdi-magnify"
        single-line
        v-model="searchText"
        placeholder="Search Notes"
        light
        class="search_container"
      ></v-text-field>
    </v-toolbar>
    <v-card class="mx-auto">
      <v-toolbar color="orange " light>
        <v-toolbar-title>Notes</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn color="#faa307" fab @click="createNewNote" shaped small ripple>
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-toolbar>
      <v-list two-line class="py-0 overflow-y-auto" style="max-height: 70vh">
        <v-list-item-group
          v-model="selectedListItem"
          active-class="orange--text"
        >
          <template v-for="note in notes">
            <Note :note="note" :key="note.uuid" />
          </template>
        </v-list-item-group>
      </v-list>
    </v-card>
  </v-col>
</template>

<script>
import dbService from "../services/db_service";
import { EventBus } from "../event-bus";

import Note from "./Note";

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
    removeNoteFromList(uuid) {
      return (this.notes = this.notes.filter((note) => note.uuid !== uuid));
    },
    updateNote({ tags, uuid, text, title, tagList }) {
      let noteToUpdate = this.notes.find((note) => note.uuid === uuid);
      Object.assign(noteToUpdate, { text, title, tagList, tags });
    },
    addNewNote(note) {
      return this.notes.push(note);
    },
    sortBy() {
      if (this.selectedFilter === "Newest") {
        this.orderByNewest();
      } else if (this.selectedFilter === "Oldest") {
        this.orderByOldest();
      } else {
        return;
      }
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
    createNewNote() {
      EventBus.$emit("resetTextField");
    },
  },

  watch: {
    searchText: function (newVal) {
      if (newVal === "") {
        this.notes = dbService.getNotes();
        return;
      }
      this.notes = dbService.getNotes().filter((note) => {
        return (
          note.text.includes(newVal) ||
          note.title.includes(newVal) ||
          note.tagList.includes(newVal)
        );
      });
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