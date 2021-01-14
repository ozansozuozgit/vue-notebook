<template>
  <h4>
    {{ category.title }}
  </h4>
</template>

<script>
export default {
  props: {
    category: Object,
  },

  mounted() {
    // console.log(this.category.uuid);
  },
};
</script>

<style scoped>
h4:hover {
  color: red;
  cursor: pointer;
}
</style>