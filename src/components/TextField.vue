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
    ...mapActions(["addNotes", "updateCurrentNote"]),

    handleClick() {
      const uuid = uuidv4();

      // Save Note
      if (!this.getCurrentNote) {
        db.collection("notes")
          .add({
            title: this.noteTitle,
            uuid,
            categoryID: this.getCurrentCategory,
          })
          .then(function () {
            console.log("Note successfully written!");
          })
          .catch(function (error) {
            console.error("Error writing Note: ", error);
          });

        this.addNotes({
          title: this.noteTitle,
          uuid,
          category: this.getCurrentCategory,
        });

        this.updateCurrentNote({
          title: this.noteTitle,
          uuid,
          categoryID: this.getCurrentCategory,
        });
      }
      // Save text
      if (this.text === "") return;
      db.collection("texts")
        .doc(this.getCurrentNote.uuid)
        .set({
          text: this.text,
          noteID: this.getCurrentNote.uuid,
          categoryID: this.getCurrentCategory,
        })
        .then(function () {
          console.log("Text successfully written!");
        })
        .catch(function (error) {
          console.error("Error writing Text: ", error);
        });
    },
  },
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
      this.noteTitle = "";
    },
    "$store.state.currentNote": function () {
      this.text = "";
      if (this.getCurrentNote) {
        this.noteTitle = this.getCurrentNote.title;
      }
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
  flex: 0.5;
}
input {
  border: 1px solid black;
  width: 80%;
}
textarea {
  border: 1px solid black;
  height: 80%;
  width: 80%;
}
button {
  border: 1px solid black;
  display: block;
}
</style>
