<template>
  <div>
    <button @click="handleClick">Save</button>
    <textarea v-model="text" />
  </div>
</template>

<script>
import db from "../firebase/init";
import { mapGetters } from "vuex";
export default {
  name: "TextField",
  data: () => {
    return {
      text: "",
    };
  },
  methods: {
    handleClick() {
      if (this.text === "") return;
      db.collection("texts")
        .doc(this.getCurrentNote)
        .set({ text: this.text, noteID: this.getCurrentNote });
    },
  },
  mounted() {},
  computed: {
    ...mapGetters(["getCurrentNote", "getText"]),
  },
  watch: {
    "$store.state.text": function () {
      console.log(this.$store.state.text);
      this.text = "";
      this.text = this.getText;
    },
  },
};
</script>

<style scoped>
textarea {
  border: 1px solid black;
}
</style>
