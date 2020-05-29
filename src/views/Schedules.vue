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
      :items="schedules"
      :search="search"
      :item-key="name"
      show-select
    ></v-data-table>
  </v-card>
</template>

<script>
export default {
  name: "Home",
  components: {},
  data() {
    return {
      headers: [
        {
          text: "Name",
          align: "start",
          value: "name"
        },
        { text: "namespace", value: "namespace" },
        { text: "ttl", value: "ttl" },
        { text: "schedule", value: "schedule" },
        { text: "includedNamespaces", value: "includedNamespaces" },
        { text: "phase", value: "phase" },
        { text: "lastBackup", value: "lastBackup" }
      ],
      schedules: undefined
    };
  },
  methods: {
    getSchedules: function() {
      const baseURI = "/api/apis/velero.io/v1/namespaces/velero/schedules";
      this.$http
        .get(baseURI)
        .then(result => {
          if (result.status == 200) {
            this.schedules = [];
            result.data.items.forEach(item => {
              let tmp = {};
              tmp["id"] = item.metadata.uid;
              tmp["name"] = item.metadata.name;
              tmp["namespace"] = item.metadata.namespace;
              tmp["ttl"] = item.spec.template.ttl;
              tmp["schedule"] = item.spec.schedule;
              tmp["includedNamespaces"] = item.spec.template.includedNamespaces;
              tmp["phase"] = item.status.phase;
              tmp["lastBackup"] = item.status.lastBackup;
              this.schedules.push(tmp);
            });
            console.log(this.schedules);
          } else {
            this.schedules = undefined;
          }
        })
        .catch(error => {
          this.schedules = undefined;
          console.log(error);
        });
    }
  },
  mounted() {
    this.getSchedules();
  }
};
</script>
