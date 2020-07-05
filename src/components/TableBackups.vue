<template>
  <div id="backups">
    <v-card>
      <v-card-title>
        <v-text-field
          v-model="search"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
        <FormBackup
          :dialog="dialog"
          :form="form"
          persistent
          max-width="800px"
        />
        <v-btn icon @click="getBackups()">
          <v-icon>mdi-refresh</v-icon>
        </v-btn>
        <v-btn icon @click="deleteBackups(selectedItemsName)">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
        <v-menu :close-on-content-click="false" max-height="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <v-list subheader dense flat>
            <v-list-item-group
              v-model="settings"
              multiple
              v-on:change="updateRow()"
            >
              <template v-for="(value, index) in keysList">
                <v-list-item :key="index" :value="value">
                  <template v-slot:default="{ active, toggle }">
                    <v-list-item-action>
                      <v-checkbox
                        :input-value="active"
                        color="primary"
                        @click="toggle"
                      ></v-checkbox>
                    </v-list-item-action>

                    <v-list-item-content>
                      <v-list-item-title v-text="value">{{
                        index
                      }}</v-list-item-title>
                    </v-list-item-content>
                  </template>
                </v-list-item>
              </template>
            </v-list-item-group>
          </v-list>
        </v-menu>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="backups"
        :search="search"
        show-select
        dense
        show-expand
        multi-sort
        :loading="loading"
        :itemsPerPage="30"
        itemKey="metadata.name"
        v-on:input="selectedItems(selected)"
        v-model="selected"
      >
        <template v-slot:expanded-item="{ item }">
          <td :colspan="headers.length">
            <kbd>{{ item }}</kbd>
          </td>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<style scoped></style>

<script>
import { mapGetters } from "vuex";
import FormBackup from "@/components/FormBackup";

export default {
  components: {
    FormBackup
  },
  data() {
    return {
      search: "",
      dialog: false,
      menu2: false,
      alertMsg: "",
      alertColor: "",
      alertEnabled: false,
      selectedItemsName: [],
      form: {},
      settings: [
        "metadata.name",
        "spec.ttl",
        "status.errors",
        "status.phase",
        "metadata.creationTimestamp"
      ],
      headers: []
    };
  },
  computed: {
    ...mapGetters({
      error: "backups/error",
      loading: "backups/isLoading",
      backups: "backups/backups",
      namespaces: "namespaces/namespaces",
      volumeSnapshotLocation: "volumeSnapshotLocation/volumeSnapshotLocation",
      backupStorageLocation: "backupStorageLocation/backupStorageLocation",
      keysList: "backups/keys"
    })
  },
  methods: {
    getBackups: function() {
      this.$store.dispatch("backups/getBackups");
    },
    getBackup: function(id) {
      this.$store.dispatch("backups/getBackup", id);
    },
    getNamespaces: function() {
      this.$store.dispatch("namespaces/getNamespaces");
    },
    getVolumeSnapshotLocation: function() {
      this.$store.dispatch("volumeSnapshotLocation/getVolumeSnapshotLocation");
    },
    getBackupStorageLocation: function() {
      this.$store.dispatch("backupStorageLocation/getBackupStorageLocation");
    },
    deleteBackups: function(backups) {
      this.$store.dispatch("backups/deleteBackups", backups);
      this.getBackups();
    },
    alert: function(msg, status) {
      this.alertMsg = msg;
      this.alertColor = status;
    },
    createBackup: function(form) {
      this.$store.dispatch("backups/createBackup", form);
      this.dialog = false;
      this.getBackups();
      this.alert("Backup newly created", "success");
    },
    updateRow: function() {
      this.headers = [];
      this.settings.sort().forEach((value, index) => {
        this.headers[index] = {
          text: value.split(/[./]/).pop(),
          align: "start",
          value: value
        };
      });
    },
    selectedItems: function(items) {
      if (!items[0]) return;
      this.selectedItemsName = items.map(a => a.metadata.name);
    },
    submit() {
      this.createBackup(this.form);
    }
  },
  mounted() {
    this.getBackups();
    this.getNamespaces();
    this.getVolumeSnapshotLocation();
    this.getBackupStorageLocation();
    this.updateRow();
  }
};
</script>
