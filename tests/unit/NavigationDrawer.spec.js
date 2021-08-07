import VueRouter from "vue-router";
import Vuetify from "vuetify";
import { shallowMount, createLocalVue } from "@vue/test-utils";
import { routes } from "@/router";
import NavigationDrawer from "@/components/NavigationDrawer.vue";

const localVue = createLocalVue();
const router = new VueRouter({ routes });
localVue.use(Vuetify);

describe("NavigationDrawer", () => {
  const wrapper = shallowMount(NavigationDrawer, {
    localVue,
    router,
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
      logoutFunction: function() {
        return;
      }
    }
  });
  it("renders a vue instance", () => {
    expect(wrapper.find(".v-list-item__content").text()).toBe("");
  });
});
