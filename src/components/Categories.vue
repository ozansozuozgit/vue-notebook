<template>
  <div class="categories_container">
    <div class="category_nav">
      <input type="text" v-model="categoryTitle" placeholder="Category Title" />
      <img src="../assets/add.svg" @click="handleClick" />
    </div>

    <h2>Categories</h2>
    <div v-for="category in getCategories" :key="category.uuid">
      <Category :category="category" />
    </div>
  </div>
</template>

<script>
import Category from "./Category";
import { mapGetters } from "vuex";
import { v4 as uuidv4 } from "uuid";
import db from "../firebase/init";
import { mapActions } from "vuex";
export default {
  name: "Categories",
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
  components: {
    Category,
  },
  computed: {
    ...mapGetters(["getCategories"]),
  },
};
</script>

<style lang="scss" scoped>
.categories_container {
  flex: 0.25;
}
input {
  border: 1px solid black;
}
img {
  height: 16px;
  width: 16px;
  cursor: pointer;
}
.category_nav {
  display: flex;
  align-items: center;
  width: 70%;
  justify-content: space-between;
}
</style>