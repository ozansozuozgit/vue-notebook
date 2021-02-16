 <template>
  <v-dialog width="500px" v-model="dialog">
    <template v-slot:activator="{ on, attrs }">
      <v-card
        v-bind="attrs"
        v-on="on"
        height="200px"
        color="primary"
        class="note_card"
      >
        <v-card-title class="text-header font-weight-bold white--text"
          >{{ note.title }}
        </v-card-title>

        <v-card-subtitle
          v-if="note.text.length < 150"
          class="text-caption white--text"
        >
          {{ note.text }}
        </v-card-subtitle>
        <v-card-subtitle v-else class="text-caption">
          {{ note.text.substring(0, 150) + ".." }}
        </v-card-subtitle>
      </v-card>
    </template>
    <template>
      <v-card class="read_only_note">
        <v-card-subtitle class="text-h4 black--text font-weight-bold pa-5"
          >{{ note.title }}
        </v-card-subtitle>
        <v-card-subtitle>
          <span
            v-for="(note, index) in this.note.tagList"
            :key="index"
            class="tag_span"
          >
            {{ note }}
          </span>
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
          <p v-html="convertedText" @click="detectYoutubeClick"></p>
        </v-card-subtitle>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="deleteDialog = true">
            Delete
          </v-btn>
          <v-btn color="secondary darken-2" text @click="closeNoteView()">
            Close
          </v-btn>
          <v-btn color="secondary darken-2" text @click="editNote">
            Edit
          </v-btn>
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
    <v-dialog v-model="youtubeDialog" width="500">
      <iframe
        id="ytplayer"
        type="text/html"
        width="500"
        height="400"
        :src="youtubeSrc"
        frameborder="0"
      ></iframe>
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
      youtubeDialog: false,
      youtubeSrc: "",
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
    detectYoutubeClick(e) {
      if (e.target.innerText.includes("youtube")) {
        const url = e.target.innerText.replace("watch?v=", "embed/");
        if (!url.includes("http")) return;
        this.youtubeSrc = url;
        this.youtubeDialog = true;
      }
    },
  },
  computed: {
    convertedText: function () {
      const urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
      return this.note.text.replace(urlRegex, function (url, b, c) {
        const url2 = c == "www." ? "http://" + url : url;
        if (url2.includes("youtube")) {
          return `<span class="youtube_url">${url}</span>`;
        } else {
          return '<a href="' + url2 + '" target="_blank">' + url + "</a>";
        }
      });
    },
  },
  watch: {
    youtubeDialog: function (newVal) {
      if (newVal === false) this.youtubeSrc = "";
    },
  },
  beforeDestroy() {
    EventBus.$off("openNoteView", this.openNoteView);
  },
};
</script>

<style lang="scss" >
.text__container {
  height: 50vh;
  p {
    width: 100%;
  }
}
.note_card {
  border: 1px solid black !important;
}
.theme--dark.v-card .v-card__title {
  color: black !important;
}
.theme--dark.v-card .v-card__subtitle {
  color: black !important;
}
.read_only_note.theme--dark {
  .v-card__subtitle {
    color: white !important;
    display: flex;
    flex-wrap: wrap;
  }
  .tag_span {
    background-color: white;
    color: black !important;
    padding: 2px;
    border-radius: 3px;
    margin: 5px;
  }
}
.read_only_note.theme--light {
  .v-card__subtitle {
    display: flex;
    flex-wrap: wrap;
  }
  .tag_span {
    color: white !important;
    background-color: #212121;
    padding: 2px;
    border-radius: 3px;
    margin: 5px;
  }
}
.youtube_url {
  text-decoration: underline;
  &:hover {
    cursor: pointer;
  }
}
</style>