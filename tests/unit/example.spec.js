import { shallowMount } from "@vue/test-utils";
import NavigationDrawer from "@/components/NavigationDrawer.vue";

describe("NavigationDrawer.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = "";
    const wrapper = shallowMount(NavigationDrawer, {
      propsData: { msg }
    });
    expect(wrapper.text()).toMatch(msg);
  });
});
