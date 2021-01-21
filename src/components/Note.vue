<template>
  <div class="note">
    <h4 @click="handleClick">
      {{ note.title }}
    </h4>
    <a href="#" class="close" @click="handleDelete" />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import dbService from "../services/db_service";
export default {
  props: {
    note: Object,
  },
  methods: {
    ...mapActions(["updateCurrentNote", "addDbText", "deleteNote"]),
    handleClick() {
      console.log(this.note);
      this.updateCurrentNote(this.note);
      this.getText();
    },
    handleDelete() {
      if (
        !confirm(
          `Are you sure you want to delete the note '${this.note.title}' and its notes?`
        )
      )
        return;

      this.deleteNote(this.note.uuid);
      dbService.removeNote(this.note);
    },
    getText() {
      console.log(this.note.text);
      this.addDbText(this.note.text);
    },
  },
};
</script>

<style lang="scss" scoped>
.note {
  display: flex;
  position: relative;
}
h4 {
  cursor: pointer;
}
:hover {
  color: red;
}
.close {
  position: absolute;
  right: 32px;
  top: 5px;
  width: 16px;
  height: 16px;
  opacity: 0.3;
}
.close:hover {
  opacity: 1;
}
.close:before,
.close:after {
  position: absolute;
  left: 15px;
  content: " ";
  height: 10px;
  width: 2px;
  background-color: #333;
}
.close:before {
  transform: rotate(45deg);
}
.close:after {
  transform: rotate(-45deg);
}
</style>