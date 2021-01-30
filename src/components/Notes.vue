<template>
  <v-card class="mx-auto" max-width="500">
    <v-toolbar color="pink" dark>
      <v-toolbar-title>Notes</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-toolbar>

    <v-list two-line>
      <v-list-item-group v-model="selected" active-class="pink--text">
        <template v-for="note in getNotes">
          <v-list-item :key="note.uuid">
            <template v-slot:default="{ active }">
              <v-list-item-content>
                <v-list-item-title v-text="note.title"></v-list-item-title>

                <v-list-item-subtitle v-text="note.text"></v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action>
                <v-icon v-if="!active" color="grey lighten-1">
                  mdi-delete-outline
                </v-icon>

                <v-icon v-else color="yellow darken-3"> mdi-delete </v-icon>
              </v-list-item-action>
            </template>
          </v-list-item>

          <v-divider
            v-if="getNotes.length < getNotes.length - 1"
            :key="note.uuid"
          ></v-divider>
        </template>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import dbService from "../services/db_service";

// import Note from "./Note";

export default {
  name: "Notes",

  data: () => {
    return { selected: 0, searchText: "" };
  },
  components: {
    // Note,
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
    ...mapGetters(["getNotes"]),
  },
  watch: {
    searchText: function (newVal) {
      if (newVal === "") {
        this.addDbNotes(dbService.getNotes());
        return;
      }
      let results = dbService.getNotes().filter((note) => {
        return (
          note.text.includes(newVal) ||
          note.title.includes(newVal) ||
          note.tagList.includes(newVal)
        );
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