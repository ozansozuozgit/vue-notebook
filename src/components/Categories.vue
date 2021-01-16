<template>
  <div class="categories_container">
    <CategoryNav />
    <h2>Categories</h2>
    <div v-for="category in getCategories" :key="category.uuid">
      <Category :category="category" />
    </div>
  </div>
</template>

<script>
import Category from "./Category";
import CategoryNav from "./CategoryNav";
import { mapGetters } from "vuex";

export default {
  name: "Categories",
  components: {
    Category,
    CategoryNav,
  },
  computed: {
    ...mapGetters(["getCategories"]),
  },
};
</script>

<style lang="scss" scoped>
</style>