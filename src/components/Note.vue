 <template>
  <v-dialog max-width="600" v-model="dialog">
    <template v-slot:activator="{ on, attrs }">
      <v-card v-bind="attrs" v-on="on" outlined>
        <v-card-title class="text-subtitle-1 orange--text text--lighten-2"
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
      <v-card outlined>
        <v-card-subtitle class="text-subtitle-1 orange--text text--lighten-2"
          >{{ note.title }}
        </v-card-subtitle>
        <v-card-subtitle>
          {{ note.tagList }}
        </v-card-subtitle>
        <v-card-subtitle>
          <span v-html="convertedText"></span>
        </v-card-subtitle>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeNoteView()">
            Close
          </v-btn>
          <v-btn color="blue darken-1" text @click="editNote"> Edit </v-btn>
        </v-card-actions>
      </v-card>
    </template>
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
    deleteNote() {
      // EventBus.$emit("resetTextField");
      // EventBus.$emit("removeNoteFromNoteList", this.note.uuid);
      // dbService.removeNote(this.note.uuid);
    },
    editNote() {
      EventBus.$emit("editNote", this.note);
      this.closeNoteView();
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
</style>