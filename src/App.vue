<template>
  <v-app>
    <NavigationDrawer app />
    <v-app-bar app>
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
import NavigationDrawer from "./components/NavigationDrawer";

export default {
  name: "App",

  components: {
    NavigationDrawer
  },

  data: () => ({
    //
  })
};
</script>
