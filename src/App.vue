<template>
  <v-app>
    <v-main>
      <!-- <HelloWorld/> -->
      <TextField />
    </v-main>
  </v-app>
</template>

<script>
// import HelloWorld from './components/HelloWorld';
import TextField from './components/TextField'

export default {
  name: 'App',

  components: {
    // HelloWorld,
    TextField,
  },

  data: () => ({
    //
  }),
};
</script>
