 <template>
  <div>
    <v-list-item @click="selectNote">
      <template v-slot:default="{ active }">
        <v-list-item-content>
          <v-list-item-title v-text="note.title"></v-list-item-title>

          <v-list-item-subtitle v-text="note.text"></v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action @click="expand = !expand" v-if="!expand">
          <v-icon v-if="!active" color="grey lighten-1">
            mdi-delete-outline
          </v-icon>

          <v-icon v-else color="yellow darken-3"> mdi-delete </v-icon>
        </v-list-item-action>
        <v-list-item-action @click="expand = !expand" v-if="expand">
          <v-icon @click="deleteNote"> mdi-checkbox-marked-circle </v-icon>

          <v-icon color="yellow darken-3"> mdi-close-box </v-icon>
        </v-list-item-action>
      </template>
    </v-list-item>
    <v-divider :key="note.uuid"></v-divider>
  </div>
</template>

<script>
import { EventBus } from "../event-bus";
import dbService from "../services/db_service";

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
      EventBus.$emit("addNoteToTextField", this.note);
    },
    deleteNote() {
      EventBus.$emit("resetTextField");
      EventBus.$emit("removeNoteFromNoteList", this.note.uuid);

      dbService.removeNote(this.note.uuid);
    },
  },
};
</script>

<style lang="scss" scoped>
:hover {
  color: red;
}
</style>