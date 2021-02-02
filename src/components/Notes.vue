<template>
  <v-col cols="4">
    <v-toolbar color="primary" class="mb-2 pa-2 filter__toolbar">
      <v-select
        :items="items"
        label="Filter By"
        @change="sortBy()"
        v-model="selectedFilter"
        single-line
        hide-details
        outlined
        rounded
      ></v-select>
      <v-text-field
        hide-details
        append-icon="mdi-magnify"
        single-line
        v-model="searchText"
      ></v-text-field>
    </v-toolbar>
    <v-card class="mx-auto">
      <v-toolbar color="pink" dark>
        <v-toolbar-title>Notes</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn color="#faa307" fab @click="newNote" shaped small ripple>
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-toolbar>
      <v-list two-line class="py-0 overflow-y-auto" style="max-height: 70vh">
        <v-list-item-group v-model="selected" active-class="pink--text">
          <template v-for="note in getNotes">
            <Note :note="note" :key="note.uuid" />
          </template>
        </v-list-item-group>
      </v-list>
    </v-card>
  </v-col>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import dbService from "../services/db_service";
import { EventBus } from "../event-bus";

import Note from "./Note";

export default {
  name: "Notes",

  data: () => {
    return {
      selected: 0,
      searchText: "",
      items: ["Newest", "Oldest"],
      selectedFilter: "",
    };
  },
  components: {
    Note,
  },
  methods: {
    ...mapActions(["addDbNotes"]),
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
      return this.getNotes.sort(function (a, b) {
        return new Date(b.date) - new Date(a.date);
      });
    },
    orderByOldest() {
      return this.getNotes.sort(function (a, b) {
        return new Date(a.date) - new Date(b.date);
      });
    },
    newNote() {
      //this.$emit('myEvent')
      this.$store.dispatch("setNewNote", true);
      EventBus.$emit("EVENT_NAME", "test");

      // this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
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

<style lang="scss" >
.filter__toolbar {
  height: 100px !important;

  .theme--dark {
    color: black;
  }
  .theme--light {
    color: white;
  }
}
.filter__toolbar > .v-toolbar__content {
  height: 100% !important;
}
</style>