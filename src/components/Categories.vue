<template>
  <div class="categories_container">
    <div class="category_nav">
      <input
        type="text"
        v-model="categoryTitle"
        placeholder="Category Title"
        @keyup.enter="handleAddCategory"
      />
      <img src="../assets/add_category.svg" @click="handleAddCategory" />
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
    handleAddCategory() {
      const trimmedTitle = this.categoryTitle.trim();
      if (trimmedTitle === "") {
        alert("Please enter a valid category name.");
        return;
      }

      const allCategories = dbService.getCategories();
      if (allCategories !== null) {
        for (let category of allCategories) {
          if (trimmedTitle === category) {
            alert(`${category} already exists!`);
            return;
          }
        }
      }
      this.addCategory(trimmedTitle);
      dbService.addCategory(this.categoryTitle.replace(/ /g, ""));
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