import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "@mdi/font/css/materialdesignicons.css";
import axios from "axios";

Vue.prototype.$http = axios;
Vue.config.productionTip = false;

const token = localStorage.getItem("user-token");
if (token) {
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
}

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
