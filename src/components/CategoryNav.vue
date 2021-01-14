<template>
  <div>
    <input type="text" v-model="categoryTitle" />
    <button @click="addCategory">Add</button>
    {{ categoryTitle }}
  </div>
</template>

<script>
import { v4 as uuidv4 } from "uuid";
import db from "../firebase/init";
export default {
  name: "CategoryNav",
  data: () => {
    return { categoryTitle: "" };
  },
  methods: {
    addCategory() {
      const title = this.categoryTitle;

      db.collection("categories")
        .add({
          title: title,
          uuid: uuidv4(),
        })
        .then(function () {
          console.log("Document successfully written!");
        })
        .catch(function (error) {
          console.error("Error writing document: ", error);
        });
    },
  },
};
</script>

<style scoped>
input {
  border: 1px solid black;
}
</style>