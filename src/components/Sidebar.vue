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
import { EventBus } from "../event-bus";

export default {
  data: () => {
    return {
      searchText: "",
      items: ["Newest", "Oldest"],
      selectedFilter: "",
    };
  },
  methods: {
    sortBy() {
      if (this.selectedFilter === "Newest") {
        EventBus.$emit("orderByNewest");
      } else if (this.selectedFilter === "Oldest") {
        EventBus.$emit("orderByOldest");
      } else {
        return;
      }
    },
  },
  watch: {
    searchText: function (newVal) {
      EventBus.$emit("filterSearch", newVal);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>