<template>
  <div class="textfield_container">
    <input
      type="text"
      v-model="noteTitle"
      placeholder="Note Title"
      :disabled="isDisabled"
    />
    <textarea v-model="text" :disabled="isDisabled" />
    <div class="button_container">
      <button @click="addNewNote">New Note</button>
      <button :disabled="isDisabled" @click="updateNote">Update</button>
    </div>
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

    addNewNote() {
      const uuid = uuidv4();

      db.collection("notes")
        .doc(uuid)
        .set({
          title: this.noteTitle,
          uuid,
          categoryID: this.getCurrentCategory,
          text: this.text,
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
    },

    updateNote() {
      db.collection("notes")
        .doc(this.getCurrentNote.uuid)
        .update({ title: this.noteTitle, text: this.text })
        .then(function () {
          console.log("NoteTitle successfully written!");
        })
        .catch(function (error) {
          console.error("Error writing NoteTitle: ", error);
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

<style lang='scss' scoped>
.textfield_container {
  flex: 0.5;
}
input {
  border: 1px solid black;
  width: 80%;
  height: 45px;
  border-bottom: none;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  padding: 10px;
}
textarea {
  border: 1px solid black;
  height: 80%;
  width: 80%;
  padding: 10px;
}
button {
  border: 1px solid black;
  padding: 10px 15px;
  border-radius: 8px;
  background-color: black;
  color: white;
  font-weight: bold;

  &:hover {
    background-color: rgb(84, 81, 81);
    cursor: pointer;
  }
}
.button_container {
  display: flex;
  width: 40%;
  justify-content: space-around;
}
</style>
