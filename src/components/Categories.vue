<template>
  <div class="categories_container">
    <div class="category_nav">
      <input type="text" v-model="categoryTitle" placeholder="Category Title" />
      <img src="../assets/add.svg" @click="handleCLick" />
    </div>

    <h2>Categories</h2>
    <div v-for="(category, index) in getCategories" :key="index">
      <Category :category="category" />
    </div>
  </div>
</template>

<script>
import Category from "./Category";
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
import dbService from "../services/db_service";

export default {
  name: "Categories",
  data: () => {
    return { categoryTitle: "" };
  },
  methods: {
    ...mapActions(["addCategory"]),
    handleCLick() {
      if (this.categoryTitle === "") return;
      this.addCategory(this.categoryTitle);
      dbService.addCategory(this.categoryTitle);
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
h2 {
  border-bottom: 1px solid black;
  margin: 10px 0;
  display: inline-block;
  color: #3a62be;
}
</style>