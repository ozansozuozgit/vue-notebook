<template>
  <v-card class="note-form-container">
    <v-text-field
      v-model="title"
      placeholder="Note Title"
      hide-details
      class="font-weight-bold text-h5 pa-2"
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

    <div class="mt-2">
      <input
        type="file"
        id="uploadImg"
        style="display: none"
        multiple
        accept="image/*"
        v-on:change="handleFileUploads"
      />
      <label class="text-button pa-2 upload__label ml-3 mt-2" for="uploadImg"
        >Upload Image</label
      >
    </div>
    <v-container>
      <v-row justify="space-around"
        ><div v-for="(image, index) in allImages" :key="index">
          <div style="position: relative">
            <v-img
              :src="image"
              height="70px"
              width="70px"
              contain
              class="mx-2 uploaded__image"
              @click="openImage(image)"
            ></v-img>
            <v-btn
              icon
              color="pink"
              class="close__button"
              @click="handleDeleteButton(image)"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>
        </div>
        <v-spacer></v-spacer>
      </v-row>
    </v-container>

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
      <v-btn text @click="closeForm()" class="close__btn"> Close </v-btn>
      <v-btn color="secondary darken-2" text @click="saveNote"> Save </v-btn>
    </v-card-actions>
    <v-dialog v-model="dialog" width="500" dark>
      <v-img :src="selectedImage" @click="dialog = false"></v-img>
    </v-dialog>
    <v-dialog
      v-model="imageDeletionDialog"
      width="500"
      class="image_delete_dialog"
    >
      <v-img :src="selectedImage"></v-img>
      <v-btn color="red darken-1" text @click="deleteImage">
        Delete Image
      </v-btn>
      <v-btn text @click="imageDeletionDialog = false"> Close </v-btn>
    </v-dialog>
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
      allImages: [],
      dialog: false,
      selectedImage: "",
      imageDeletionDialog: false,
    };
  },

  mounted() {
    EventBus.$on("editNote", (noteToEdit) => {
      this.fillNoteForm(noteToEdit);
    });
  },
  methods: {
    openImage(image) {
      this.selectedImage = image;
      this.dialog = true;
    },
    handleDeleteButton(image) {
      this.imageDeletionDialog = true;
      this.selectedImage = image;
    },
    deleteImage() {
      this.allImages = this.allImages.filter(
        (img) => img !== this.selectedImage
      );
      this.imageDeletionDialog = false;
      this.selectedImage = "";
    },
    handleFileUploads(e) {
      const images = e.target.files;
      let imageArray = [];
      for (let i = 0; i < images.length; i++) {
        const reader = new FileReader();
        const image = images[i];
        reader.onload = () => {
          imageArray.push(reader.result);
        };
        reader.readAsDataURL(image);
      }
      this.allImages = imageArray;

      e.target.value = "";
    },

    saveNote() {
      if (this.title.trim() === "") {
        alert("Please enter note title!");
        return;
      }
      if (this.text === null) this.text = "";
      if (this.currentNoteID === null) {
        this.createNewNote();
      } else {
        this.updateNote();
      }
      this.resetForm();
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
        allImages: this.allImages,
      };

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
        allImages: this.allImages,
      };
      dbService.updateNote(updatedNote);
      EventBus.$emit("updateNote", updatedNote);
    },
    resetForm() {
      this.tags = [];
      this.text = "";
      this.title = "";
      this.currentNoteID = null;
      this.allImages = [];
      this.selectedImage = "";
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
      this.allImages = noteToEdit.allImages;
    },
  },
  beforeDestroy() {
    EventBus.$off("fillNoteForm", this.fillNoteForm);
  },
};
</script>

<style lang="scss" >
.uploaded__image {
  position: relative;
  cursor: pointer;
}
.close__button {
  position: absolute;
  top: 0;
  right: 0;
}

.upload__label {
  background-color: gray;
  cursor: pointer;
  &:hover {
    background-color: lightgrey;
  }
}
.note-form-container {
  scrollbar-width: none;
}
.v-input__control,
.v-input__slot,
.v-text-field__slot {
  height: 100% !important;
}
.v-textarea {
  height: 350px !important;
}
.vue-tags-input {
  max-width: 100% !important;
  border: none;
  background: transparent !important;
}
.v-dialog {
  background-color: rgb(230, 230, 230);
}

.vue-tags-input .ti-tag {
  position: relative;
}

.vue-tags-input .ti-input {
  padding: 4px 10px;
  transition: border-bottom 200ms ease;
  border: none;
  height: 50px;
  overflow: auto;
}

.note-form-container.theme--dark {
  .vue-tags-input .ti-tag {
    position: relative;
    background: white;
    color: black !important;
  }
  .vue-tags-input .ti-new-tag-input {
    color: #07c9d2;
  }
}
.note-form-container.theme--light {
  .vue-tags-input .ti-tag {
    position: relative;
    background: black;
    color: white !important;
  }
  .vue-tags-input .ti-new-tag-input {
    color: #085e62;
  }
}
</style>