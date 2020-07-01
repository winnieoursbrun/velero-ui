<template>
  <v-app>
    <NavigationDrawer
      app
      dark
      v-if="isAuthenticated"
      :links="links"
      :logoutFunction="logout"
      :status="status"
      :permanent="navBarVisible"
      title="Velero"
    />
    <v-app-bar color="deep-purple accent-4" dark app v-if="isAuthenticated">
      <v-app-bar-nav-icon
        @click.stop="navBarVisible = !navBarVisible"
        v-if="window.width <= 1264 && navBarVisible"
      >
        <v-icon>
          mdi-close
        </v-icon>
      </v-app-bar-nav-icon>
      <v-app-bar-nav-icon
        @click.stop="navBarVisible = !navBarVisible"
        v-if="window.width <= 1264 && !navBarVisible"
      >
      </v-app-bar-nav-icon>
      <v-toolbar-title>{{ $route.name }}</v-toolbar-title>
    </v-app-bar>
    <v-content>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-content>
  </v-app>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>

<script>
import { mapGetters } from "vuex";
import NavigationDrawer from "@/components/NavigationDrawer";
export default {
  name: "App",

  components: {
    NavigationDrawer
  },

  data() {
    return {
      links: [
        { title: "Dashboard", icon: "mdi-home", route: "/" },
        { title: "Backups", icon: "mdi-backup-restore", route: "/backups" },
        { title: "Schedules", icon: "mdi-clock-outline", route: "/schedules" },
        { title: "Settings", icon: "mdi-tune", route: "/settings" }
      ],
      status: "",
      navBarVisible: false,
      window: {
        width: 0,
        height: 0
      }
    };
  },
  computed: {
    ...mapGetters({
      isAuthenticated: "auth/isAuthenticated"
    })
  },
  methods: {
    logout: function() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/login");
    },
    login: function(token) {
      this.$store.dispatch("auth/login", token);
    },
    tryConnection: function() {
      this.status = "loading";
      this.$store
        .dispatch("auth/tryConnection")
        .then(() => {
          this.status = "success";
        })
        .catch((this.status = ""));
      setInterval(() => {
        this.$store
          .dispatch("auth/tryConnection")
          .then(() => {
            this.status = "success";
          })
          .catch((this.status = ""));
      }, 60000);
    },
    handleResize() {
      this.window.width = window.innerWidth;
      this.window.height = window.innerHeight;
    }
  },
  created: function() {
    this.tryConnection();
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  }
};
</script>
