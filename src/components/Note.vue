<template>
  <h4 @click="handleClick">
    {{ note.title }}
  </h4>
</template>

<script>
import { mapActions } from "vuex";
import db from "../firebase/init";
export default {
  props: {
    note: Object,
  },
  methods: {
    ...mapActions(["updateCurrentNote", "addDbText"]),
    handleClick() {
      this.updateCurrentNote(this.note.uuid);
      this.getText();
    },
    getText() {
      db.collection("texts")
        .where("noteID", "==", this.note.uuid)
        .get()
        .then((snapshot) => {
          let dbText = snapshot.docs.map((doc) => doc.data());
          this.addDbText(dbText[0].text);
        })
        .catch((e) => {
          this.addDbText("");
          console.log(e);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
h4 {
  cursor: pointer;
}
:hover {
  color: red;
}
</style>