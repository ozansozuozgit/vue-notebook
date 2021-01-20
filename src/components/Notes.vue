<template>
  <div class="notes_container">
    <select v-model="selected" @change="sortBy()">
      <option disabled value="">Filter By</option>
      <option>Newest</option>
      <option>Oldest</option>
    </select>
    <h2>Notes</h2>
    <div v-for="note in getNotes" :key="note.uuid">
      <Note :note="note" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Note from "./Note";

export default {
  name: "Notes",
  data: () => {
    return { selected: "" };
  },
  methods: {
    sortBy() {
      console.log(this.selected);
      if (this.selected === "Newest") {
        this.orderByNewest();
      } else if (this.selected === "Oldest") {
        this.orderByOldest();
      } else {
        return;
      }
    },
    orderByNewest() {
      return this.getNotes.sort(function (a, b) {
        return new Date(b.date) - new Date(a.date);
      });
    },
    orderByOldest() {
      return this.getNotes.sort(function (a, b) {
        return new Date(a.date) - new Date(b.date);
      });
    },
  },
  components: {
    Note,
  },
  computed: {
    ...mapGetters(["getNotes"]),
  },
};
</script>

<style lang="scss" scoped>
.notes_container {
  flex: 0.25;

  h2 {
    border-bottom: 1px solid black;
    margin: 10px 0;
    display: inline-block;
    color: #3a62be;
  }
}

select {
  display: block;
  background-color: black;
  padding: 2px 10px;
  border-radius: 5px;
  font-weight: bold;
  color: white;

  &:hover {
    background-color: grey;
    cursor: pointer;
  }
}
</style>