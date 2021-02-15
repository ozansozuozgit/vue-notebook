<template>
  <v-toolbar
    class="px-2 filter__toolbar mt-2"
    rounded
    height="50px"
    color="primary darken-1"
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
      class="search_container"
      rounded
      light
    ></v-text-field>

    <div class="mx-3">
      <v-tooltip v-if="!$vuetify.theme.dark" bottom>
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" color="secondary" small fab @click="darkMode">
            <v-icon class="mr-1">mdi-moon-waxing-crescent</v-icon>
          </v-btn>
        </template>
        <span>Dark Mode On</span>
      </v-tooltip>

      <v-tooltip v-else bottom>
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" color="secondary" small fab @click="darkMode">
            <v-icon color="white">mdi-white-balance-sunny</v-icon>
          </v-btn>
        </template>
        <span>Dark Mode Off</span>
      </v-tooltip>
    </div>
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
    darkMode() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    },
  },
  watch: {
    searchText: function (newVal) {
      EventBus.$emit("filterSearch", newVal);
    },
  },
};
</script>

<style lang="scss" >
.filter__toolbar {
  display: flex;
}
.select_container {
  flex: 0.4;

  .theme--dark.v-label {
    color: black !important;
  }
  .theme--light.v-label {
    color: white !important;
  }
}
.mdi-menu-down {
  color: #00c6cf !important;
}
.v-input.search_container {
  flex: 0.6;
  background: white !important;
  border: 1px solid black;
}
.filter__toolbar > .v-toolbar__content {
  height: 100% !important;
  padding: 0px !important;
}
</style>