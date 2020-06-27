<template>
  <v-navigation-drawer app :mini-variant.sync="mini" permanent dark>
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
          <v-icon color="success" v-if="status === 'success'">
            mdi-checkbox-blank-circle
          </v-icon>
          <v-icon color="info" v-else-if="status === 'loading'">
            mdi-checkbox-blank-circle
          </v-icon>
          <v-icon color="error" v-else-if="status === ''" hover>
            mdi-checkbox-blank-circle
          </v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-btn v-on:click="logoutFunction" block>Logout</v-btn>
        </v-list-item-content>
      </v-list-item>
    </template>
  </v-navigation-drawer>
</template>

<script>
export default {
  data() {
    return {
      mini: true,
      token: undefined
    };
  },
  props: {
    links: Array,
    connected: Boolean,
    logoutFunction: Function,
    status: String
  }
};
</script>

<style></style>
