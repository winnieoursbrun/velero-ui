<template>
  <v-app>
    <NavigationDrawer app v-if="isAuthenticated" />
    <v-app-bar app v-if="isAuthenticated">
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
import NavigationDrawer from "./components/NavigationDrawer";
export default {
  name: "App",

  components: {
    NavigationDrawer
  },

  computed: {
    ...mapGetters({
      isAuthenticated: "auth/isAuthenticated"
    }),
    isAuthenticated() {
      return this.$store.getters["auth/isAuthenticated"];
    }
  }
};
</script>
