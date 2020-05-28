import Vue from "vue";
import VueRouter from "vue-router";
import Dashboard from "@/views/Dashboard.vue";
import Backups from "@/views/Backups.vue";
import Schedules from "@/views/Schedules.vue";
import Settings from "@/views/Settings.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard
  },
  {
    path: "/backups",
    name: "Backups",
    component: Backups
  },
  {
    path: "/schedules",
    name: "Schedules",
    component: Schedules
  },
  {
    path: "/settings",
    name: "Settings",
    component: Settings
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
