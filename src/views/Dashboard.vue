<template>
  <div class="dashboard">
    <v-btn v-on:click="fetchUsers">Click</v-btn>
    <p>{{ users }}</p>
  </div>
</template>

<script>
export default {
  name: "Dashboard",
  components: {},
  data() {
    return {
      users: []
    };
  },
  methods: {
    fetchUsers: function() {
      const baseURI = "/api/healthz/ping";
      this.$http
        .get(baseURI, {
          timeout: 10000,
          withCredentials: false
        })
        .then(result => {
          this.users = result.status;
        });
    }
  },
  mounted() {
    this.fetchUsers();
  }
};
</script>
