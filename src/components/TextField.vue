<template>
  <div class="textfield_container">
    <input
      type="text"
      v-model="noteTitle"
      placeholder="Note Title"
      :disabled="isDisabled"
    />
    <textarea v-model="text" :disabled="isDisabled" />
    <button :disabled="isDisabled" @click="handleClick">Save</button>
  </div>
</template>

<script>
import { v4 as uuidv4 } from "uuid";

import db from "../firebase/init";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "TextField",
  data: () => {
    return {
      text: "",
      isDisabled: true,
      noteTitle: "",
    };
  },
  methods: {
    ...mapActions(["addNotes"]),

    handleClick() {
      const title = this.noteTitle;
      const uuid = uuidv4();
      // Save Note
      db.collection("notes")
        .add({
          title,
          uuid,
          categoryID: this.getCurrentCategory,
        })
        .then(function () {
          console.log("Document successfully written!");
        })
        .catch(function (error) {
          console.error("Error writing document: ", error);
        });
      this.addNotes({ title, uuid, category: this.getCurrentCategory });
      this.noteTitle = "";

      // Save text
      if (this.text === "") return;
      db.collection("texts").doc(this.getCurrentNote.uuid).set({
        text: this.text,
        noteID: this.getCurrentNote.uuid,
        categoryID: this.getCurrentCategory,
      });
    },
  },
  mounted() {},
  computed: {
    ...mapGetters(["getCurrentNote", "getText", "getCurrentCategory"]),
  },
  watch: {
    "$store.state.currentCategory": function () {
      if (this.getCurrentCategory === null) {
        this.text = "";
      } else {
        this.isDisabled = false;
      }
    },
    "$store.state.currentNote": function () {
      this.text = "";
      this.noteTitle = this.getCurrentNote.title;
    },
    "$store.state.text": function () {
      this.text = "";
      this.text = this.getText;
    },
  },
};
</script>

<style scoped>
.textfield_container {
  width: 450px;
}
input {
  border: 1px solid black;
  width: 450px;
}
textarea {
  border: 1px solid black;
  height: 450px;
  width: 450px;
}
button {
  border: 1px solid black;
  display: block;
}
</style>
