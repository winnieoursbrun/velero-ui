import Vue from "vue";
import VueRouter from "vue-router";
import Vuetify from "vuetify";
import { mount, createLocalVue } from "@vue/test-utils";
import { routes } from "@/router";
import NavigationDrawer from "@/components/NavigationDrawer.vue";

// Vuetify has to be installed on the global Vue constructor so that every
// child component gets $vuetify injected (see the Vuetify unit testing guide).
Vue.use(Vuetify);

const localVue = createLocalVue();
localVue.use(VueRouter);
const router = new VueRouter({ routes });
const vuetify = new Vuetify();

describe("NavigationDrawer", () => {
  const wrapper = mount(NavigationDrawer, {
    localVue,
    router,
    vuetify,
    propsData: {
      links: [
        { title: "Dashboard", icon: "mdi-home", route: "/" },
        { title: "Backups", icon: "mdi-backup-restore", route: "/backups" },
        {
          title: "Schedules",
          icon: "mdi-clock-outline",
          route: "/schedules"
        },
        { title: "Settings", icon: "mdi-tune", route: "/settings" }
      ],
      status: "",
      connected: true,
      logoutFunction: function () {
        return;
      }
    }
  });
  it("renders a vue instance", () => {
    expect(wrapper.find(".v-list-item__content").text()).toBe("");
  });
});
