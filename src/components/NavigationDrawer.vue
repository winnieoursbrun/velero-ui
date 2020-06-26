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
          <v-icon
            color="success"
            v-if="status == 'success'"
            v-on:click="logout"
          >
            mdi-checkbox-blank-circle
          </v-icon>
          <v-icon color="info" v-else-if="status == 'loading'"
            >mdi-checkbox-blank-circle</v-icon
          >
          <v-icon color="error" v-else-if="!status" hover
            >mdi-checkbox-blank-circle</v-icon
          >
        </v-list-item-icon>

        <v-list-item-content>
          <v-btn v-on:click="logout" block>Logout</v-btn>
        </v-list-item-content>
      </v-list-item>
    </template>

    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Access Token</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Token"
                  type="password"
                  v-model="tmpToken"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer>{{ error }}</v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false"
            >Close</v-btn
          >
          <v-btn color="blue darken-1" text v-on:click="login(tmpToken)"
            >Login</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-navigation-drawer>
</template>

<script>
export default {
  data() {
    return {
      drawer: true,
      dialog: false,
      tmpToken: "",
      error: "",
      links: [
        { title: "Dashboard", icon: "mdi-home", route: "/" },
        { title: "Backups", icon: "mdi-backup-restore", route: "/backups" },
        { title: "Schedules", icon: "mdi-clock-outline", route: "/schedules" },
        { title: "Settings", icon: "mdi-tune", route: "/settings" }
      ],
      connected: this.$store.getters.isAuthenticated,
      mini: true,
      token: undefined,
      status: false
    };
  },
  created: function() {
    this.tryConnection();
  },
  methods: {
    logout: function() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/login");
    },
    login: function(token) {
      this.$store
        .dispatch("auth/login", token)
        .then(() => {
          this.dialog = false;
        })
        .catch(err => {
          this.error = err;
        });
    },
    tryConnection: function() {
      this.status = "loading";
      this.$store
        .dispatch("auth/tryConnection")
        .then(() => {
          this.status = "success";
        })
        .catch((this.status = false));
      setInterval(() => {
        this.$store
          .dispatch("auth/tryConnection")
          .then(() => {
            this.status = "success";
          })
          .catch((this.status = false));
      }, 60000);
    }
  }
};
</script>

<style></style>
