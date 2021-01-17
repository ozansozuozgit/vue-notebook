<template>
  <div class="note">
    <h4 @click="handleClick">
      {{ note.title }}
    </h4>
    <a href="#" class="close" @click="handleDelete" />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import db from "../firebase/init";
export default {
  props: {
    note: Object,
  },
  methods: {
    ...mapActions(["updateCurrentNote", "addDbText", "deleteNote"]),
    handleClick() {
      this.updateCurrentNote(this.note);
      this.getText();
    },
    handleDelete() {
      console.log(this.note.uuid);
      this.deleteNote(this.note.uuid);
      this.updateCurrentNote(null);

      // Remove Note from Firestore Database
      db.collection("notes")
        .where("uuid", "==", this.note.uuid)
        .get()
        .then(function (querySnapshot) {
          querySnapshot
            .forEach(function (doc) {
              doc.ref.delete();
            })
            .catch((e) => {
              console.log(e);
            });
        });

      // Remove Notes Text from Firestore Database
      db.collection("texts")
        .where("noteID", "==", this.note.uuid)
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            doc.ref.delete();
            this.addDbText("");
          });
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getText() {
      this.addDbText("");
      db.collection("notes")
        .where("uuid", "==", this.note.uuid)
        .get()
        .then((snapshot) => {
          let dbText = snapshot.docs.map((doc) => doc.data());
          if (!dbText.length) return;
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
.note {
  display: flex;
  position: relative;
}
h4 {
  cursor: pointer;
}
:hover {
  color: red;
}
.close {
  position: absolute;
  right: 32px;
  top: 5px;
  width: 16px;
  height: 16px;
  opacity: 0.3;
}
.close:hover {
  opacity: 1;
}
.close:before,
.close:after {
  position: absolute;
  left: 15px;
  content: " ";
  height: 10px;
  width: 2px;
  background-color: #333;
}
.close:before {
  transform: rotate(45deg);
}
.close:after {
  transform: rotate(-45deg);
}
</style>