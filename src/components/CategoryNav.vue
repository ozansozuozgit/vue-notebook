<template>
  <div>
    <input type="text" v-model="categoryTitle" />
    <button>Add</button>
    <button>Delete</button>
    {{ categoryTitle }}
  </div>
</template>

<script>
export default {
  name: "CategoryNav",
  data: () => {
    return { categoryTitle: "" };
  },
  watch: {
    categoryTitle: {
      handler() {
        console.log(this.categoryTitle);
      },
    },
  },
};
</script>

<style lang="scss" scoped>
</style>