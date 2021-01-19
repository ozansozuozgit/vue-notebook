<template>
  <div class="app_container">
    <Categories />
    <Notes />
    <TextField />
  </div>
</template>

<script>
import TextField from "./components/TextField";
import Categories from "./components/Categories";
import Notes from "./components/Notes";
// import db from "./firebase/init";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "App",

  components: {
    Categories,
    Notes,
    TextField,
  },

  mounted() {
    // db.collection("categories")
    //   .get()
    //   .then((snapshot) => {
    //     let dbCategories = snapshot.docs.map((doc) => doc.data());
    //     this.addDbCategories(dbCategories);
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });
    // let test = Object.entries(localStorage).filter((entry) => {
    //   console.log(entry);
    //   return entry[0] === "category";
    // });

    let categoriesString = localStorage.getItem("categories");
    let categories = JSON.parse(categoriesString);
    console.log(categories);
    this.addDbCategories(categories);
  },
  computed: {
    ...mapGetters(["getCategories", "getCurrentCategory", "getCurrentNote"]),
  },
  methods: {
    ...mapActions(["addDbCategories"]),
  },
};
</script>

<style scoped>
.app_container {
  display: flex;
  justify-content: space-evenly;
  height: 100vh;
  width: 88%;
  margin: auto;
  padding-top: 10px;
}
</style>