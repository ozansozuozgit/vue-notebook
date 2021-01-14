<template>
  <div class="categories_container">
    <div v-for="category in getCategories" :key="category.uuid">
      <Category :category="category" />
    </div>
  </div>
</template>

<script>
import Category from "./Category";
import { mapGetters } from "vuex";

export default {
  name: "Categories",
  components: {
    Category,
  },
  computed: {
    ...mapGetters(["getCategories"]),
  },
};
</script>

<style lang="scss" scoped>
</style>