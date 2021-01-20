<template>
  <div class="textfield_container">
    <input
      type="text"
      v-model="noteTitle"
      placeholder="Note Title"
      :disabled="isDisabled"
    />
    <textarea v-model="text" :disabled="isDisabled" @change="handleUpdate" />
    <div class="button_container">
      <button @click="addNewNote">New Note</button>
    </div>
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
    ...mapActions(["addNotes", "updateCurrentNote", "addDbNotes"]),
    handleUpdate() {
      let updatedNotes = dbService.updateNote(
        this.getCurrentCategory,
        this.getCurrentNote.uuid,
        this.text
      );
      this.addDbNotes(updatedNotes);
    },
    addNewNote() {
      const uuid = uuidv4();
      dbService.addNote(
        this.getCurrentCategory,
        this.noteTitle,
        this.text,
        uuid,
        new Date().toLocaleString()
      );
      this.addNotes({
        category: this.getCurrentCategory,
        title: this.noteTitle,
        text: this.text,
        uuid,
        date: new Date().toLocaleString(),
      });

      this.updateCurrentNote(uuid);
    },
  },
  computed: {
    ...mapGetters(["getCurrentNote", "getText", "getCurrentCategory"]),
  },
  watch: {
    getCurrentCategory: function (newValue) {
      if (newValue === null) {
        this.text = "";
      } else {
        this.isDisabled = false;
      }
      this.noteTitle = "";
    },
    "$store.state.currentNote": function () {
      this.noteTitle = "";
      this.$set(this, "text", "");

      if (this.getCurrentNote) {
        this.noteTitle = this.getCurrentNote.title;
      }
    },
    "$store.state.text": function () {
      this.$set(this, "text", this.getText);
      // this.text = this.getText;
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
