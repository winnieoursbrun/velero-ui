<template>
  <v-navigation-drawer
    app
    v-model="drawer"
    :mini-variant.sync="mini"
    permanent
    dark
  >
    <v-list-item class="px-2">
      <v-list-item-icon>
        <v-img
          alt="Velero Logo"
          class="shrink mr-2"
          contain
          src="@/assets/velero-icon.svg"
          transition="scale-transition"
          width="50"
        />
      </v-list-item-icon>
      <v-list-item-content>
        <v-img
          alt="Velero Text"
          class="shrink mr-2"
          contain
          src="@/assets/velero-text.svg"
          transition="scale-transition"
          width="200"
        />
      </v-list-item-content>

      <v-btn icon @click.stop="mini = !mini">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
    </v-list-item>

    <v-divider></v-divider>

    <v-list>
      <v-list-item v-for="link in links" :key="link.title" :to="link.route">
        <v-list-item-icon>
          <v-icon>{{ link.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ link.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <template v-slot:append>
      <v-list-item>
        <v-list-item-icon>
          <v-icon color="success" v-if="connected">
            mdi-check-circle-outline
          </v-icon>
          <v-icon color="info" v-else-if="loading">
            mdi-timer-sand
          </v-icon>
          <v-icon v-else color="error" v-on:click="isConnected">
            mdi-refresh
          </v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title v-if="connected">Connected</v-list-item-title>
          <v-list-item-title v-else-if="loading">Loading</v-list-item-title>
          <v-list-item-title v-else>
            Not Connected
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </template>
  </v-navigation-drawer>
</template>

<script>
export default {
  data() {
    return {
      drawer: true,
      links: [
        { title: "Dashboard", icon: "mdi-home", route: "/" },
        { title: "Backups", icon: "mdi-backup-restore", route: "/backups" },
        { title: "Schedules", icon: "mdi-clock-outline", route: "/schedules" },
        { title: "Settings", icon: "mdi-tune", route: "/settings" }
      ],
      connected: false,
      loading: true,
      mini: true
    };
  },
  methods: {
    isConnected: function() {
      const baseURI = "/api/healthz/ping";
      this.loading = true;
      this.$http
        .get(baseURI)
        .then(result => {
          if (result.status == 200) {
            this.loading = false;
            this.connected = true;
          } else {
            this.loading = false;
            this.connected = false;
          }
        })
        .catch(error => {
          this.loading = false;
          this.connected = false;
          console.log(error);
        });
    }
  },
  mounted() {
    this.isConnected();
  }
};
</script>

<style></style>
