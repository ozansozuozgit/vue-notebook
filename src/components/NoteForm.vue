<template>
  <v-card class="note-form-container">
    <v-text-field
      v-model="title"
      placeholder="Note Title"
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
      clearable
      clear-icon="mdi-close-circle"
      no-resize
      hide-details
      solo
      flat
    ></v-textarea>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue darken-1" text @click="closeForm"> Close </v-btn>
      <v-btn color="blue darken-1" text @click="saveNote"> Save </v-btn>
    </v-card-actions>
  </v-card>
</template>
  
<script>
import { EventBus } from "../event-bus";
import VueTagsInput from "@johmun/vue-tags-input";
import { v4 as uuidv4 } from "uuid";
import dbService from "../services/db_service";

export default {
  name: "NoteForm",
  components: { VueTagsInput },

  data: () => {
    return {
      text: "",
      title: "",
      tag: "",
      tags: [],
      currentNoteID: null,
    };
  },

  mounted() {
    EventBus.$on("editNote", (noteToEdit) => {
      this.fillNoteForm(noteToEdit);
    });
  },
  methods: {
    saveNote() {
      if (this.title.trim() === "") {
        alert("Please enter note title!");
        return;
      }
      if (this.currentNoteID === null) {
        this.createNewNote();
      } else {
        this.updateNote();
      }
    },
    createNewNote() {
      const tagList = this.tags.map((tag) => {
        return tag.text;
      });
      const uuid = uuidv4();
      const newNote = {
        title: this.title,
        tags: this.tags,
        text: this.text,
        uuid,
        date: new Date().toLocaleString(),
        tagList,
      };

      this.resetForm();
      dbService.addNote(newNote);
      EventBus.$emit("addNewNote", newNote);
      EventBus.$emit("closeNoteForm");
    },
    updateNote() {
      const tagList = this.tags.map((tag) => {
        return tag.text;
      });
      let updatedNote = {
        tags: this.tags,
        uuid: this.currentNoteID,
        text: this.text,
        title: this.title,
        tagList: tagList,
      };
      dbService.updateNote(updatedNote);
      EventBus.$emit("updateNote", updatedNote);
    },
    resetForm() {
      this.tags = [];
      this.text = "";
      this.title = "";
      this.currentNoteID = null;
    },
    closeForm() {
      if (this.currentNoteID !== null) {
        EventBus.$emit("openNoteView", this.currentNoteID);
      }
      this.resetForm();
      EventBus.$emit("closeNoteForm");
    },
    fillNoteForm(noteToEdit) {
      this.text = noteToEdit.text;
      this.title = noteToEdit.title;
      this.tags = noteToEdit.tags;
      this.currentNoteID = noteToEdit.uuid;
    },
  },
  beforeDestroy() {
    EventBus.$off("fillNoteForm", this.fillNoteForm);
  },
};
</script>

<style lang="css" >
.note-form-container {
  scrollbar-width: none;
}
.v-input__control,
.v-input__slot,
.v-text-field__slot {
  height: 100% !important;
}
.v-textarea {
  height: 450px !important;
}
.vue-tags-input {
  max-width: 100% !important;
}
</style>