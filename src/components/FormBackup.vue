<template>
  <div id="formBackup">
    <v-dialog v-model="dialog" persistent max-width="800px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon color="primary" dark v-bind="attrs" v-on="on">
          <v-icon>mdi-plus-box</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">New Backup</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col>
                <v-text-field
                  label="Name"
                  v-model="form.name"
                  required
                ></v-text-field>
              </v-col>
              <Panel :form="form" :hooks="hooks" />
            </v-row>
            <!-- <v-row>
              <v-col>
                <v-btn color="info" @click="newHook()">New Hook</v-btn>
              </v-col>
            </v-row> -->
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false"
            >Close</v-btn
          >
          <v-btn color="blue darken-1" text v-on:click="submit">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Panel from "@/components/Panel";
export default {
  components: {
    Panel
  },
  data() {
    return {
      menu2: false,
      tab: 0,
      hooks: [],
      form: {}
    };
  },
  props: {
    dialog: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    ...mapGetters({
      namespaces: "namespaces/namespaces",
      volumeSnapshotLocation: "volumeSnapshotLocation/volumeSnapshotLocation",
      backupStorageLocation: "backupStorageLocation/backupStorageLocation"
    })
  },
  methods: {
    getNamespaces: function() {
      this.$store.dispatch("namespaces/getNamespaces");
    },
    getVolumeSnapshotLocation: function() {
      this.$store.dispatch("volumeSnapshotLocation/getVolumeSnapshotLocation");
    },
    getBackupStorageLocation: function() {
      this.$store.dispatch("backupStorageLocation/getBackupStorageLocation");
    },
    createBackup: function(form) {
      this.$store.dispatch("backups/createBackup", form);
      this.dialog = false;
      this.getBackups();
      this.alert("Backup newly created", "success");
    },
    submit() {
      this.createBackup(this.form);
    },
    newHook() {
      console.log(this.hooks);
      if (!this.hooks) {
        this.hooks = [];
      }
      this.hooks.push({
        id: Math.round(Math.random() * 10000)
      });
      this.$emit("input", this.hooks);
    }
  },
  mounted() {
    this.getNamespaces();
    this.getVolumeSnapshotLocation();
    this.getBackupStorageLocation();
  }
};
</script>
