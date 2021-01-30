 <template>
  <div>
    <v-list-item @click="handleClick">
      <template v-slot:default="{ active }">
        <v-list-item-content>
          <v-list-item-title v-text="note.title"></v-list-item-title>

          <v-list-item-subtitle v-text="note.text"></v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action @click="handleDelete">
          <v-icon v-if="!active" color="grey lighten-1">
            mdi-delete-outline
          </v-icon>

          <v-icon v-else color="yellow darken-3"> mdi-delete </v-icon>
        </v-list-item-action>
      </template>
    </v-list-item>
    <v-divider :key="note.uuid"></v-divider>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import dbService from "../services/db_service";
export default {
  props: {
    note: Object,
  },
  methods: {
    ...mapActions(["setCurrentNote", "addDbText", "deleteNote"]),
    handleClick() {
      this.setCurrentNote(this.note);
      this.addDbText(this.note.text);
    },
    handleDelete() {
      if (
        !confirm(
          `Are you sure you want to delete the note '${this.note.title}'?`
        )
      ) {
        return;
      }
      this.setCurrentNote(null);
      this.deleteNote(this.note.uuid);
      dbService.removeNote(this.note.uuid);
    },
  },
};
</script>

<style lang="scss" scoped>
.note {
  display: flex;
  position: relative;
}
h4 {
  cursor: pointer;
}
:hover {
  color: red;
}
.close {
  position: absolute;
  right: 32px;
  top: 5px;
  width: 16px;
  height: 16px;
  opacity: 0.3;
}
.close:hover {
  opacity: 1;
}
.close:before,
.close:after {
  position: absolute;
  left: 15px;
  content: " ";
  height: 10px;
  width: 2px;
  background-color: #333;
}
.close:before {
  transform: rotate(45deg);
}
.close:after {
  transform: rotate(-45deg);
}
</style>