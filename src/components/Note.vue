 <template>
  <v-card @click="selectNote" outlined>
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

<script>
// import { EventBus } from "../event-bus";
// import dbService from "../services/db_service";

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
};
</script>

<style lang="scss" scoped>

</style>