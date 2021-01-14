<template>
  <div>
    <input type="text" v-model="categoryTitle" />
    <button @click="handleClick">Add Category</button>
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
      console.log(title);
      if (title === "") return;

      const categoryInfo = { title: title, uuid: uuidv4() };
      db.collection("categories")
        .add({
          categoryInfo,
        })
        .then(function () {
          console.log("Document successfully written!");
        })
        .catch(function (error) {
          console.error("Error writing document: ", error);
        });

      this.addCategory(categoryInfo);

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