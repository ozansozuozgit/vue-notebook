<template>
  <h4 @click="handleClick(category.uuid)">
    {{ category.title }}
  </h4>
</template>

<script>
import { mapActions } from "vuex";
import db from "../firebase/init";

export default {
  props: {
    category: Object,
  },
  methods: {
    ...mapActions(["updateCurrentCategory", "addDbNotes"]),

    handleClick(uuid) {
      this.setCurrentCategory(uuid);
      this.getNotes(uuid);
    },
    setCurrentCategory(uuid) {
      this.updateCurrentCategory(uuid);
    },
    async getNotes(uuid) {
      const snapshot = await db
        .collection("notes")
        .where("category", "==", uuid)
        .get();

      let dbNotes = snapshot.docs.map((doc) => doc.data());
      this.addDbNotes(dbNotes);
    },
  },
};
</script>

<style scoped>
h4:hover {
  color: red;
  cursor: pointer;
}
</style>