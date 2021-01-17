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
      this.getNotes(uuid);
      this.updateCurrentNote(null);
    },
    async handleDelete() {
      // Reset State
      this.deleteCategory(this.category.uuid);
      this.updateCurrentNote(null);
      this.updateCurrentCategory(null);
      this.addDbNotes([]);

      // Remove Notes Text from Firestore Database
      await db
        .collection("texts")
        .where("categoryID", "==", this.category.uuid)
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            doc.ref.delete();
          });
        })
        .catch((e) => console.log(e));

      // Remove Note from Firestore Database
      await db
        .collection("notes")
        .where("categoryID", "==", this.category.uuid)
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            doc.ref.delete();
          });
        })
        .catch((e) => console.log(e));

      // Remove Category from Firestore Database
      await db
        .collection("categories")
        .where("uuid", "==", this.category.uuid)
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            doc.ref.delete();
          });
        })
        .catch((e) => console.log(e));
    },
    setCurrentCategory(uuid) {
      this.updateCurrentCategory(uuid);
    },
    getNotes(uuid) {
      db.collection("notes")
        .where("categoryID", "==", uuid)
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