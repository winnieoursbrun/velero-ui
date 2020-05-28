<template>
  <div id="app">
    <NavigationDrawer />
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
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
