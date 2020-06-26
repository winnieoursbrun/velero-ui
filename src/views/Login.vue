<template>
  <div id="login">
    <v-app>
      <v-container fluid fill-height class="">
        <v-layout flex align-center justify-center>
          <v-flex xs12 sm4 elevation-6>
            <v-toolbar class="pt-5" color="primary">
              <v-toolbar-title class="white--text"
                ><h4>VeleroUI</h4></v-toolbar-title
              >
            </v-toolbar>
            <v-card>
              <v-card-text class="pt-4">
                <v-form v-model="valid" ref="form">
                  <v-text-field
                    label="Enter your Token"
                    v-model="token"
                    :rules="tokenRules"
                    required
                  ></v-text-field>
                  <v-layout justify-space-between>
                    <v-btn
                      v-on:click="submit"
                      :class="{
                        'blue darken-4 white--text': valid,
                        disabled: !valid
                      }"
                    >
                      Login
                    </v-btn>
                    <p class="red--text">{{ error }}</p>
                  </v-layout>
                </v-form>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-app>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      valid: false,
      token: "",
      error: "",
      tokenRules: [v => !!v || "Token is required"]
    };
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.$store
          .dispatch("auth/login", this.token)
          .then(() => {
            this.$router.push("/");
          })
          .catch(err => {
            this.error = err;
          });
      }
    }
  }
};
</script>

<style>
#login {
  background-size: cover;
  background-color: beige;
  overflow: hidden;
}
</style>
