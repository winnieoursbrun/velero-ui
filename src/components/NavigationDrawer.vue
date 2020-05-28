<template>
  <v-navigation-drawer
    app
    v-model="drawer"
    :mini-variant.sync="mini"
    permanent
    dark
  >
    <v-list-item class="px-2">
      <v-img
        alt="Velero Logo"
        class="shrink mr-2"
        contain
        src="@/assets/velero-icon.svg"
        transition="scale-transition"
        width="100"
      />

      <v-img
        alt="Velero Logo"
        class="shrink mr-2"
        contain
        src="@/assets/velero-text.svg"
        transition="scale-transition"
        width="200"
      />
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
  </v-navigation-drawer>
</template>

<script>
export default {
  data() {
    return {
      drawer: true,
      links: [
        { title: "Backups", icon: "mdi-backup-restore", route: "/" },
        { title: "Schedules", icon: "mdi-clock-outline", route: "/schedule" },
        { title: "Settings", icon: "mdi-tune", route: "/settings" }
      ],
      mini: false
    };
  }
};
</script>

<style></style>
