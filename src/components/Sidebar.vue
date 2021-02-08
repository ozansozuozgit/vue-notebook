<template>
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
</template>

<script>
// import dbService from "../services/db_service";

export default {
  data: () => {
    return {
      searchText: "",
      items: ["Newest", "Oldest"],
      selectedFilter: "",
    };
  },
  methods: {
    removeNoteFromList(uuid) {
      return (this.notes = this.notes.filter((note) => note.uuid !== uuid));
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
  },
  watch: {
    searchText: function (newVal) {
      if (newVal === "") {
        // this.notes = dbService.getNotes();
        return;
      }
      //   this.notes = dbService.getNotes().filter((note) => {
      //     return (
      //       note.text.includes(newVal) ||
      //       note.title.includes(newVal) ||
      //       note.tagList.includes(newVal)
      //     );
      //   });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>