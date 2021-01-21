<template>
  <div class="category">
    <h4 @click="handleClick">
      {{ category }}
    </h4>
    <a href="#" class="close" @click="handleDelete" />
  </div>
</template>


<script>
import { mapActions } from "vuex";
import dbService from "../services/db_service";

export default {
  props: {
    category: String,
  },
  methods: {
    ...mapActions([
      "updateCurrentCategory",
      "updateCurrentNote",
      "addDbNotes",
      "deleteCategory",
      "addDbText",
      "addDbNotes",
    ]),

    handleClick(uuid) {
      this.setCurrentCategory(uuid);
      this.updateCurrentNote(null);
      let allNotes = dbService.getNotes(this.category);
      if (allNotes === null) {
        this.addDbNotes([]);
        return;
      }
      this.addDbNotes(allNotes);
    },
    handleDelete() {
      if (
        !confirm(
          `Are you sure you want to delete the category ${this.category} and its notes?`
        )
      )
        return;

      // Reset State
      this.deleteCategory(this.category);
      this.updateCurrentNote(null);
      this.updateCurrentCategory(null);
      this.addDbNotes([]);
      dbService.removeCategory(this.category);
    },
    setCurrentCategory() {
      this.updateCurrentCategory(this.category);
    },
    getNotes() {},
  },
};
</script>

<style lang='scss' scoped>
.category {
  position: relative;
}
h4:hover {
  color: red;
  cursor: pointer;
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