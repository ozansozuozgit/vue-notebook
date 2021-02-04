<template>
  <v-col cols="6" class="textfield__outer mt-4">
    <div class="textfield__container">
      <v-text-field
        v-model="noteTitle"
        placeholder="Note Title"
        @change="handleUpdate"
        label="Note Title"
        hide-details
        class="pa-2"
        flat
        solo
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
        hide-details
        solo
        flat
        class="pa-2"
      />
    </div>
  </v-col>
</template>

<script>
import { v4 as uuidv4 } from "uuid";
import VueTagsInput from "@johmun/vue-tags-input";
import { EventBus } from "../event-bus";

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
      currentNoteID: null,
    };
  },
  methods: {
    handleUpdate() {
      if (this.noteTitle.trim() === "") {
        alert("Please enter note title!");
        return;
      }
      if (this.currentNoteID !== null) {
        this.updateNote();
      } else {
        this.createNote();
      }
    },
    updateNote() {
      const tagList = this.tags.map((tag) => {
        return tag.text;
      });
      let updatedNote = {
        tags: this.tags,
        uuid: this.currentNoteID,
        text: this.text,
        title: this.noteTitle,
        tagList: tagList,
      };
      dbService.updateNote(updatedNote);
      EventBus.$emit("updateNote", updatedNote);
    },
    createNote() {
      const tagList = this.tags.map((tag) => {
        return tag.text;
      });
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
      EventBus.$emit("addNewNote", newNote);
      this.currentNoteID = uuid;
    },

    addNoteToTextField({ tags, text, title, uuid }) {
      this.tags = tags;
      this.text = text;
      this.noteTitle = title;
      this.currentNoteID = uuid;
    },

    resetTextField() {
      this.tags = [];
      this.text = "";
      this.noteTitle = "";
      this.currentNoteID = null;
    },
  },

  mounted() {
    EventBus.$on("addNoteToTextField", (note) => {
      this.addNoteToTextField(note);
    });
    EventBus.$on("resetTextField", () => {
      this.resetTextField();
    });
  },
  watch: {
    tags: function (newValue) {
      if (
        newValue.length < 0 ||
        this.noteTitle === "" ||
        this.currentNoteID === null
      )
        return;
      this.handleUpdate();
    },
  },
  beforeDestroy() {
    EventBus.$off("addNoteToTextField", this.addNoteToTextField);
    EventBus.$off("resetTextField", this.resetTextField);
  },
};
</script>

<style lang="css" scoped>
.textfield__outer {
  background-color: #1c1c1c;
  box-shadow: 0 0 0px 2px #1c1c1c;
  border-radius: 10px;
  padding: 2px !important;
}
.textfield__container {
  height: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  background-color: #fff;
}

.v-textarea,
.v-input__control,
.v-input__slot,
.v-text-field__slot {
  height: 100% !important;
}

.vue-tags-input.ti-focus .ti-input {
  border: 1px solid #ebde6e;
}
.vue-tags-input {
  max-width: 100% !important;
}
.vue-tags-input .ti-input {
  border: none;
  border-bottom: 2px solid black;
  border-top: 2px solid black;
}
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