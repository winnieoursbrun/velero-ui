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
      <!-- <v-bottom-sheet hideOverlay :value="true" persistent>
        <v-sheet class="text-center" height="200px">
          <div class="my-3">{{ selectedItemsName }}</div>
        </v-sheet>
      </v-bottom-sheet> -->
    </v-card>
  </div>
</template>

<style scoped>
/* #list {
  max-height: 500px;
} */
</style>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Backups",
  components: {},
  data() {
    return {
      search: "",
      selectedItemsName: [],
      settings: [
        "metadata.name",
        "spec.ttl",
        "spec.volumeSnapshotLocations",
        "status.errors",
        "metadata.creationTimestamp"
      ],
      headers: [
        {
          text: "Name",
          align: "start",
          value: "metadata.name"
        },
        { text: "Ttl", value: "spec.ttl" },
        {
          text: "VolumeSnapshotLocations",
          value: "spec.volumeSnapshotLocations"
        },
        { text: "Errors", value: "status.errors" },
        { text: "creationTimestamp", value: "metadata.creationTimestamp" }
      ]
    };
  },
  computed: {
    ...mapGetters({
      error: "backups/error",
      loading: "backups/isLoading",
      backups: "backups/backups",
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
    deleteBackups: function(backups) {
      this.$store.dispatch("backups/deleteBackups", backups);
      this.getBackups();
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
    }
  },
  mounted() {
    this.getBackups();
    // this.getBackup("everything-20200601155346");
  }
};
</script>
