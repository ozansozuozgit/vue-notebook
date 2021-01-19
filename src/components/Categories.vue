<template>
  <div class="categories_container">
    <div class="category_nav">
      <input type="text" v-model="categoryTitle" placeholder="Category Title" />
      <img src="../assets/add.svg" @click="handleCLick" />
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
// import db from "../firebase/init";
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
      const title = this.categoryTitle;
      if (title === "") return;
      const uuid = uuidv4();

      // db.collection("categories")
      //   .add({
      //     title,
      //     uuid,
      //   })
      //   .then(function () {
      //     console.log("Document successfully written!");
      //   })
      //   .catch(function (error) {
      //     console.error("Error writing document: ", error);
      //   });
      this.addCategory({ title, uuid });
      dbService.add_category(this.getCategories);
      console.log(this.getCategories);
      this.categoryTitle = "";
    },
  },
  components: {
    Category,
  },
  computed: {
    ...mapGetters(["getCategories"]),
  },
  mounted() {
    // dbService.update_category("123", { name: "Ahmet", age: 35 });
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