<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="space-around"
          ><Notes /> <TextField /></v-row></v-container
    ></v-main>
  </v-app>
</template>

<script>
import TextField from "./components/TextField";
import Notes from "./components/Notes";

export default {
  name: "App",

  components: {
    Notes,
    TextField,
  },
};
</script>

<style scoped>
</style>