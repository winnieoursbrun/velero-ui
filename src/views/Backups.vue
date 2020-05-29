<template>
  <v-card>
    <v-card-title>
      <v-text-field
        v-model="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
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
      :items-per-page.sync="sync"
    ></v-data-table>
  </v-card>
</template>

<script>
export default {
  name: "Home",
  components: {},
  data() {
    return {
      search: "",
      sync: "15",
      loading: true,
      headers: [
        {
          text: "Name",
          align: "start",
          value: "name"
        },
        { text: "Namespace", value: "namespace" },
        { text: "Ttl", value: "ttl" },
        { text: "VolumeSnapshotLocations", value: "volumeSnapshotLocations" },
        { text: "Errors", value: "errors" },
        { text: "creationTimestamp", value: "creationTimestamp" }
      ],
      backups: undefined
    };
  },
  methods: {
    getBackups: function() {
      const baseURI = "/api/apis/velero.io/v1/namespaces/velero/backups";
      this.loading = true;
      this.$http
        .get(baseURI)
        .then(result => {
          if (result.status == 200) {
            this.backups = [];
            result.data.items.forEach(item => {
              let tmp = {};
              tmp["id"] = item.metadata.uid;
              tmp["name"] = item.metadata.name;
              tmp["creationTimestamp"] = item.metadata.creationTimestamp;
              tmp["namespace"] = item.metadata.namespace;
              tmp["ttl"] = item.spec.ttl;
              tmp["volumeSnapshotLocations"] =
                item.spec.volumeSnapshotLocations[0];
              tmp["errors"] = item.status.errors;
              this.backups.push(tmp);
            });
            this.loading = false;
          } else {
            this.loading = false;
            this.backups = undefined;
          }
        })
        .catch(error => {
          this.loading = false;
          this.backups = undefined;
          console.log(error);
        });
    }
  },
  mounted() {
    this.getBackups();
  }
};
</script>
