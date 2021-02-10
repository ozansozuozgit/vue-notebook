<template>
  <v-app class="app">
    <v-main>
      <v-container
        ><v-row justify="center"
          ><v-col cols="9" md="10" lg="9"><Sidebar /> </v-col>
          <v-col cols="9" md="10" lg="9"><Notes /></v-col
        ></v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Notes from "./components/Notes";
import Sidebar from "./components/Sidebar";
export default {
  name: "App",

  components: {
    Sidebar,
    Notes,
  },
  created() {
    this.$vuetify.theme.dark = true;
  },
};
</script>

<style >
.app {
  font-family: "Noto Sans", sans-serif;
}
</style>
