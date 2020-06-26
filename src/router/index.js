import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";
import Dashboard from "@/views/Dashboard.vue";
import Backups from "@/views/Backups.vue";
import Schedules from "@/views/Schedules.vue";
import Settings from "@/views/Settings.vue";
import Login from "@/views/Login.vue";

Vue.use(VueRouter);

// const ifNotAuthenticated = (to, from, next) => {
//   if (!store.getters["auth/isAuthenticated"]) {
//     next("");
//     return;
//   }
//   next("/");
// };

const ifAuthenticated = (to, from, next) => {
  if (store.getters["auth/isAuthenticated"]) {
    next();
    return;
  }
  next("/login");
};

const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
    beforeEnter: ifAuthenticated
  },
  {
    path: "/backups",
    name: "Backups",
    component: Backups,
    beforeEnter: ifAuthenticated
  },
  {
    path: "/schedules",
    name: "Schedules",
    component: Schedules,
    beforeEnter: ifAuthenticated
  },
  {
    path: "/settings",
    name: "Settings",
    component: Settings,
    beforeEnter: ifAuthenticated
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
