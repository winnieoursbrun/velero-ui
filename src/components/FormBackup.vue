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
              <v-col cols="12">
                <v-text-field
                  label="Name"
                  v-model="form.name"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-combobox
                  v-model="form.includedNamespaces"
                  :items="namespaces"
                  label="Included Namespaces"
                  multiple
                  chips
                >
                  <template v-slot:selection="data">
                    <v-chip
                      :key="JSON.stringify(data.item)"
                      v-bind="data.attrs"
                      :input-value="data.selected"
                      :disabled="data.disabled"
                      @click:close="data.parent.selectItem(data.item)"
                    >
                      <v-avatar
                        class="accent white--text"
                        left
                        v-text="data.item.slice(0, 1).toUpperCase()"
                      ></v-avatar>
                      {{ data.item }}
                    </v-chip>
                  </template>
                </v-combobox>
              </v-col>
              <v-col cols="12">
                <v-autocomplete
                  :items="backupStorageLocation"
                  label="Storage Location"
                  v-model="form.backupStorageLocation"
                  required
                ></v-autocomplete>
              </v-col>
              <v-expansion-panels accordion>
                <v-expansion-panel expand focusable>
                  <v-expansion-panel-header>
                    Advanced Settings
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-col cols="12" sm="6">
                      <v-menu
                        v-model="menu2"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="form.ttl"
                            label="Ttl"
                            required
                            readonly
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="form.ttl"
                          @input="menu2 = false"
                        ></v-date-picker>
                      </v-menu>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-autocomplete
                        :items="volumeSnapshotLocation"
                        v-model="form.volumeSnapshotLocations"
                        label="volumeSnapshotLocations"
                        multiple
                      ></v-autocomplete>
                    </v-col>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-row>
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
export default {
  components: {},
  data() {
    return {
      menu2: false
    };
  },
  props: {
    form: {
      type: Object,
      required: false,
      default: function() {
        return {};
      }
    },
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
    }
  },
  mounted() {
    this.getNamespaces();
    this.getVolumeSnapshotLocation();
    this.getBackupStorageLocation();
  }
};
</script>
