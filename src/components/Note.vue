 <template>
  <v-dialog transition="dialog-bottom-transition" max-width="600">
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
      </v-card>
    </template>
  </v-dialog>
</template>

<script>
// import { EventBus } from "../event-bus";
// import dbService from "../services/db_service";
// @click="dialog.value = false"
export default {
  props: {
    note: Object,
  },

  data: () => {
    return {
      expand: false,
    };
  },
  methods: {
    selectNote() {
      // EventBus.$emit("addNoteToTextField", this.note);
    },
    deleteNote() {
      // EventBus.$emit("resetTextField");
      // EventBus.$emit("removeNoteFromNoteList", this.note.uuid);
      // dbService.removeNote(this.note.uuid);
    },
  },
  computed: {
    convertedText: function () {
      var urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
      //var urlRegex = /(https?:\/\/[^\s]+)/g;
      return this.note.text.replace(urlRegex, function (url, b, c) {
        var url2 = c == "www." ? "http://" + url : url;
        return '<a href="' + url2 + '" target="_blank">' + url + "</a>";
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>