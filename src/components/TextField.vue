<template>
  <div class="textfield_container">
    <div class="textfield_nav">
      <img src="../assets/add_note.svg" alt="add_note" @click="addNewNote" />
    </div>
    <input
      type="text"
      v-model="noteTitle"
      placeholder="Note Title"
      :disabled="isDisabled"
      @change="handleUpdate"
    />
    <textarea v-model="text" :disabled="isDisabled" @change="handleUpdate" />
  </div>
</template>

<script>
import { v4 as uuidv4 } from "uuid";
import { mapActions, mapGetters } from "vuex";
import dbService from "../services/db_service";
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
    ...mapActions(["addNotes", "setCurrentNote", "addDbNotes"]),
    handleUpdate() {
      if (this.noteTitle === "") {
        alert("Please enter not title!");
        return;
      }
      if (this.getCurrentNote !== null) {
        let updatedNotes = dbService.updateNote(
          this.getCurrentCategory,
          this.getCurrentNote.uuid,
          this.text,
          this.noteTitle
        );
        this.addDbNotes(updatedNotes);
      } else {
        const uuid = uuidv4();
        const newNote = {
          category: this.getCurrentCategory,
          title: this.noteTitle,
          text: this.text,
          uuid,
          date: new Date().toLocaleString(),
        };
        dbService.addNote(newNote);
        this.addNotes(newNote);
        this.setCurrentNote(newNote);
      }
    },
    addNewNote() {
      this.noteTitle = "";
      this.text = "";
      this.setCurrentNote(null);
    },
  },
  computed: {
    ...mapGetters(["getCurrentNote", "getText", "getCurrentCategory"]),
  },
  watch: {
    getCurrentCategory: function (newValue) {
      if (newValue !== null) {
        this.text = "";
        this.noteTitle = "";
        this.isDisabled = false;
      }
    },
    "$store.state.currentNote": function (newValue) {
      if (newValue === null) {
        this.noteTitle = "";
        this.text = "";
        return;
      }

      this.$set(this, "text", newValue.text);
      this.$set(this, "noteTitle", newValue.title);
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
  font-size: 22px;
  font-weight: bold;
  outline: none;
}
textarea {
  border: 1px solid black;
  height: 80%;
  width: 80%;
  padding: 10px;
  outline: none;
  font-size: 18px;
}
button {
  border: 1px solid black;
  padding: 10px 15px;
  border-radius: 8px;
  background-color: black;
  color: white;
  font-weight: bold;
  display: block;
  &:hover {
    background-color: rgb(84, 81, 81);
    cursor: pointer;
  }
}
.textfield_nav {
  border: 1px dotted black;
  width: 80%;
  img {
    height: 22px;
    width: 22px;
    background: rgb(132, 223, 13);
    cursor: pointer;
  }
}
</style>
