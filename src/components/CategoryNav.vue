<template>
  <div>
    <button @click="handleClick">Add Category</button>
    <input type="text" v-model="categoryTitle" />
  </div>
</template>

<script>
import { v4 as uuidv4 } from "uuid";
import db from "../firebase/init";
import { mapActions } from "vuex";

export default {
  name: "CategoryNav",
  data: () => {
    return { categoryTitle: "" };
  },
  methods: {
    ...mapActions(["addCategory"]),

    handleClick() {
      const title = this.categoryTitle;
      const uuid = uuidv4();
      if (title === "") return;

      db.collection("categories")
        .add({
          title,
          uuid,
        })
        .then(function () {
          console.log("Document successfully written!");
        })
        .catch(function (error) {
          console.error("Error writing document: ", error);
        });

      this.addCategory({ title, uuid });

      this.categoryTitle = "";
    },
  },
};
</script>

<style scoped>
input {
  border: 1px solid black;
}
</style>