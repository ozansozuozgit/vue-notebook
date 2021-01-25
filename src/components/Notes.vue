<template>
  <div class="notes_container">
    <input type="text" v-model="searchText" placeholder="Search Notes" />
    <select v-model="selected" @change="sortBy()">
      <option disabled value="">Filter By</option>
      <option>Newest</option>
      <option>Oldest</option>
    </select>
    <h2>Notes</h2>
    <div v-for="note in getNotes" :key="note.uuid">
      <Note :note="note" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import dbService from "../services/db_service";

import Note from "./Note";

export default {
  name: "Notes",
  data: () => {
    return { selected: "", searchText: "", found: false };
  },
  components: {
    Note,
  },
  methods: {
    ...mapActions(["addDbNotes"]),
    sortBy() {
      if (this.selected === "Newest") {
        this.orderByNewest();
      } else if (this.selected === "Oldest") {
        this.orderByOldest();
      } else {
        return;
      }
    },
    orderByNewest() {
      return this.getNotes.sort(function (a, b) {
        return new Date(b.date) - new Date(a.date);
      });
    },
    orderByOldest() {
      return this.getNotes.sort(function (a, b) {
        return new Date(a.date) - new Date(b.date);
      });
    },
  },
  computed: {
    ...mapGetters(["getNotes", "getCurrentCategory"]),
  },
  watch: {
    searchText: function (newVal) {
      if (newVal === "") {
        this.addDbNotes(dbService.getNotes(this.getCurrentCategory));
        return;
      }
      let results = dbService
        .getNotes(this.getCurrentCategory)
        .filter((note) => {
          return note.text.includes(newVal) || note.title.includes(newVal);
        });
      this.addDbNotes(results);
    },
  },
};
</script>

<style lang="scss" scoped>
.notes_container {
  flex: 0.25;

  h2 {
    border-bottom: 1px solid black;
    margin: 10px 0;
    display: inline-block;
    color: #3a62be;
  }
}

select {
  display: block;
  background-color: black;
  padding: 2px 10px;
  border-radius: 5px;
  font-weight: bold;
  color: white;

  &:hover {
    background-color: grey;
    cursor: pointer;
  }
}
input {
  border: 1px solid black;
}
</style>