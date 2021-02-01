<template>
  <v-col cols="6">
    <v-text-field
      v-model="noteTitle"
      placeholder="Note Title"
      @change="handleUpdate"
      label="Note Title"
      hide-details
      outlined
      class="mt-2"
    >
    </v-text-field>

    <vue-tags-input
      v-model="tag"
      :tags="tags"
      @tags-changed="(newTags) => (tags = newTags)"
    />
    <v-textarea
      v-model="text"
      @change="handleUpdate"
      clearable
      clear-icon="mdi-close-circle"
      no-resize
      outlined
      hide-details
      height="500px"
    />
  </v-col>
</template>

<script>
import { v4 as uuidv4 } from "uuid";
import { mapActions, mapGetters } from "vuex";
import VueTagsInput from "@johmun/vue-tags-input";

import dbService from "../services/db_service";
export default {
  name: "TextField",
  components: { VueTagsInput },
  data: () => {
    return {
      text: "",
      noteTitle: "",
      tag: "",
      tags: [],
    };
  },
  methods: {
    ...mapActions(["addNotes", "setCurrentNote", "addDbNotes", "setNewNote"]),
    handleUpdate() {
      if (this.noteTitle.trim() === "") {
        alert("Please enter note title!");
        return;
      }
      const tagList = this.tags.map((tag) => {
        return tag.text;
      });
      if (this.getCurrentNote !== null) {
        let updatedNotes = dbService.updateNote(
          this.tags,
          this.getCurrentNote.uuid,
          this.text,
          this.noteTitle,
          tagList
        );

        this.addDbNotes(updatedNotes);
      } else {
        const uuid = uuidv4();
        const newNote = {
          title: this.noteTitle,
          tags: this.tags,
          text: this.text,
          uuid,
          date: new Date().toLocaleString(),
          tagList,
        };
        dbService.addNote(newNote);
        this.addNotes(newNote);
        this.setCurrentNote(newNote);
      }
    },
    addNewNote() {
      this.noteTitle = "";
      this.tags = [];
      this.tag = "";
      this.text = "";
      this.setCurrentNote(null);
      this.setNewNote(false);
    },
  },
  computed: {
    ...mapGetters(["getCurrentNote", "getText"]),
  },
  watch: {
    "$store.state.currentNote": function (newValue) {
      if (newValue === null) {
        this.noteTitle = "";
        this.text = "";
        this.tags = [];
        this.tag = "";
        return;
      }
      this.$set(this, "text", newValue.text);
      this.$set(this, "noteTitle", newValue.title);
      this.$set(this, "tags", newValue.tags);
    },
    tags: function (newValue) {
      if (newValue.length < 0 || this.noteTitle === "") return;
      this.handleUpdate();
    },
    "$store.state.newNote": function (newValue) {
      if (newValue === true) {
        this.addNewNote();
      }
    },
  },
};
</script>

<style lang="css">
/* we cange the border color if the user focuses the input */
.vue-tags-input.ti-focus .ti-input {
  border: 1px solid #ebde6e;
}
.vue-tags-input {
  max-width: 100% !important;
}
/* style the placeholders color across all browser */
.vue-tags-input ::-webkit-input-placeholder {
  color: #a4b1b6;
}

.vue-tags-input ::-moz-placeholder {
  color: #a4b1b6;
}

.vue-tags-input :-ms-input-placeholder {
  color: #a4b1b6;
}

.vue-tags-input :-moz-placeholder {
  color: #a4b1b6;
}

/* default styles for all the tags */
.vue-tags-input .ti-tag {
  position: relative;
  background: #e91e63;
  color: #fff;
}
.vue-tags-input .ti-tags {
  max-height: 100px;
  overflow: auto;
}
</style>