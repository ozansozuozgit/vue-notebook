<template>
  <div class="category">
    <h4 @click="handleClick(category.uuid)">
      {{ category.title }}
    </h4>
    <a href="#" class="close" @click="handleDelete" />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import db from "../firebase/init";

export default {
  props: {
    category: Object,
  },
  methods: {
    ...mapActions(["updateCurrentCategory", "addDbNotes", "deleteCategory"]),

    handleClick(uuid) {
      this.setCurrentCategory(uuid);
      this.getNotes(uuid);
    },
    handleDelete() {
      this.deleteCategory(this.category.uuid);
    },
    setCurrentCategory(uuid) {
      this.updateCurrentCategory(uuid);
    },
    getNotes(uuid) {
      db.collection("notes")
        .where("category", "==", uuid)
        .get()
        .then((snapshot) => {
          let dbNotes = snapshot.docs.map((doc) => doc.data());
          this.addDbNotes(dbNotes);
        })
        .catch((e) => console.log(e));
    },
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