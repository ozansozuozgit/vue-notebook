 <template>
  <v-dialog width="500px" v-model="dialog">
    <template v-slot:activator="{ on, attrs }">
      <v-card
        v-bind="attrs"
        v-on="on"
        height="200px"
        color="#00C6CF"
        class="note_card"
      >
        <v-card-title class="text-header black--text text--darken-2"
          >{{ note.title }}
        </v-card-title>

        <v-card-subtitle v-if="note.text.length < 150" class="text-caption">
          {{ note.text }}
        </v-card-subtitle>
        <v-card-subtitle v-else class="text-caption">
          {{ note.text.substring(0, 150) + ".." }}
        </v-card-subtitle>
      </v-card>
    </template>
    <template>
      <v-card>
        <v-card-subtitle class="text-h4 orange--text text--lighten-2 pa-5"
          >{{ note.title }}
        </v-card-subtitle>
        <v-card-subtitle>
          {{ note.tagList }}
        </v-card-subtitle>
        <v-container>
          <v-row justify="space-around"
            ><div v-for="(image, index) in note.allImages" :key="index">
              <v-img
                :src="image"
                height="70px"
                width="70px"
                contain
                class="mx-2"
                @click="openImage(image)"
              ></v-img>
            </div>
            <v-spacer></v-spacer>
          </v-row>
        </v-container>
        <v-card-subtitle class="text__container">
          <span v-html="convertedText"></span>
        </v-card-subtitle>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="deleteDialog = true">
            Delete
          </v-btn>
          <v-btn color="blue darken-1" text @click="closeNoteView()">
            Close
          </v-btn>
          <v-btn color="blue darken-1" text @click="editNote"> Edit </v-btn>
        </v-card-actions>
      </v-card>
    </template>

    <v-dialog v-model="imageDialog" width="500">
      <v-img :src="selectedImage" @click="imageDialog = false"></v-img>
    </v-dialog>
    <v-dialog v-model="deleteDialog" width="500">
      <h4 style="text-align: center" class="pa-5">
        Are you sure you want to delete {{ note.title }}?
      </h4>
      <v-btn color="red darken-1" text @click="deleteNote()"> Delete </v-btn>
      <v-btn color="blue darken-1" text @click="deleteDialog = false">
        Close
      </v-btn>
    </v-dialog>
  </v-dialog>
</template>

<script>
import { EventBus } from "../event-bus";
export default {
  props: {
    note: Object,
  },

  data: () => {
    return {
      dialog: false,
      imageDialog: false,
      deleteDialog: false,
      selectedImage: "",
    };
  },
  mounted() {
    EventBus.$on("openNoteView", (noteID) => {
      if (this.note.uuid === noteID) {
        return this.openNoteView();
      }
    });
  },
  methods: {
    openImage(image) {
      this.selectedImage = image;
      this.imageDialog = true;
    },
    deleteNote() {
      EventBus.$emit("deleteNote", this.note.uuid);
    },
    editNote() {
      EventBus.$emit("openNoteForm");
      this.closeNoteView();
      // To load data after note form is mounted
      setTimeout(() => {
        EventBus.$emit("editNote", this.note);
      }, 200);
    },
    openNoteView() {
      this.dialog = true;
    },
    closeNoteView() {
      this.dialog = false;
    },
  },
  computed: {
    convertedText: function () {
      var urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
      return this.note.text.replace(urlRegex, function (url, b, c) {
        var url2 = c == "www." ? "http://" + url : url;
        return '<a href="' + url2 + '" target="_blank">' + url + "</a>";
      });
    },
  },
  beforeDestroy() {
    EventBus.$off("openNoteView", this.openNoteView);
  },
};
</script>

<style lang="scss" scoped>
.text__container {
  height: 50vh;
}
.note_card {
  border: 1px solid black !important;
}
</style>