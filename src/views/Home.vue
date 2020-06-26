<template>
  <div class="home">
    <NavigationDrawer />
    <v-app-bar>
      <v-toolbar-title>{{ $route.name }}</v-toolbar-title>
    </v-app-bar>
    <img alt="Vue logo" src="@/assets/logo.png" />
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  components: {}
};
</script>
