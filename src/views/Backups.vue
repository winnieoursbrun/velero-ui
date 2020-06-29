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
      >
        <template v-slot:expanded-item="{ headers, item }">
          <td :colspan="headers.length">
            {{ item }}
          </td>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Home",
  components: {},
  data() {
    return {
      search: "",
      headers: [
        {
          text: "Name",
          align: "start",
          value: "name"
        },
        { text: "Ttl", value: "ttl" },
        { text: "VolumeSnapshotLocations", value: "volumeSnapshotLocations" },
        { text: "Errors", value: "errors" },
        { text: "creationTimestamp", value: "creationTimestamp" }
      ]
    };
  },
  computed: {
    ...mapGetters({
      error: "backups/error",
      loading: "backups/isLoading",
      backups: "backups/backups"
    })
  },
  methods: {
    getBackups: function() {
      this.$store.dispatch("backups/get");
    }
  },
  mounted() {
    this.getBackups();
  }
};
</script>
