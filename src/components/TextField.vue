<template>
  <v-col cols="6" class="textfield__outer mt-4">
    <div class="textfield__container">
      <v-text-field
        v-model="noteTitle"
        placeholder="Note Title"
        @change="handleUpdate"
        label="Note Title"
        hide-details
        class="font-weight-bold text-h5"
        flat
        solo
        color="yellow"
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

<style lang="css" >
.textfield__outer {
  /* background-color: #e91e63; */
  border-radius: 10px;
  padding: 2px !important;
}
.textfield__container {
  height: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  /* background-color: #fff; */
}

.v-textarea,
.v-input__control,
.v-input__slot,
.v-text-field__slot {
  height: 100% !important;
}

.vue-tags-input {
  max-width: 100% !important;
}
.vue-tags-input .ti-input {
  border: none;
  border-bottom: 1px solid rgb(82, 82, 82);
  border-top: 1px solid rgb(82, 82, 82);
  background: #1e1e1e;
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
  background: #ff9800;
  color: #fff;
}
.vue-tags-input .ti-tags {
  max-height: 100px;
  overflow: auto;
}
.ti-new-tag-input {
  color: white;
}
</style>