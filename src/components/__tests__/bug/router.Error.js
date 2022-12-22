import { shallowMount, RouterLinkStub } from "@vue/test-utils";
import SongItem from "@/components/SongItem.vue";

//error => I don't know why!!
describe("Router", () => {
  test("renders router link", () => {
    const song = {
      docID: "abc",
    };

    const wrapper = shallowMount(SongItem, {
      props: { song },
      global: {
        components: {
          "router-link": RouterLinkStub,
        },
      },
    });

    expect(wrapper.findComponent(RouterLinkStub).props().to).toEqual({
      name: "song",
      params: { id: song.docID },
    });
  });
});
