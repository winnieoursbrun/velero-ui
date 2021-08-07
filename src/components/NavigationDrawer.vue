<template>
  <v-navigation-drawer
    :app="app"
    :dark="dark"
    :permanent="permanent"
    :mini-variant.sync="mini"
  >
    <v-list-item>
      <v-list-item-icon>
        <v-icon color="success" v-if="status === 'success'">
          mdi-zodiac-aquarius
        </v-icon>
        <v-icon color="info" v-else-if="status === 'loading'">
          mdi-zodiac-aquarius
        </v-icon>
        <v-icon color="error" v-else-if="status === ''">
          mdi-zodiac-aquarius
        </v-icon>
        <v-icon v-else> mdi-zodiac-aquarius </v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        {{ title }}
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
      <v-list-item @click="logoutFunction()" v-if="logoutFunction">
        <v-list-item-icon>
          <v-icon>mdi-logout-variant</v-icon>
        </v-list-item-icon>
        <v-list-item-content> Logout </v-list-item-content>
        <v-list-item-action> </v-list-item-action>
      </v-list-item>
    </template>
  </v-navigation-drawer>
</template>

<script>
export default {
  data() {
    return {
      token: undefined,
      mini: true
    };
  },
  props: {
    links: {
      type: Array,
      required: false,
      default: function() {
        return [];
      }
    },
    app: {
      type: Boolean,
      required: false,
      default: false
    },
    dark: {
      type: Boolean,
      required: false,
      default: false
    },
    permanent: {
      type: Boolean,
      required: false,
      default: false
    },
    logoutFunction: {
      type: Function,
      required: false
    },
    status: {
      type: String,
      required: false,
      validator: function(value) {
        return ["success", "loading", ""].indexOf(value) !== -1;
      }
    },
    title: {
      type: String,
      required: false
    }
  }
};
</script>

<style></style>
