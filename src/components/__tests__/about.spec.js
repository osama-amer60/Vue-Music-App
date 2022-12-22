import About from '../../views/AboutView.vue'
import { shallowMount } from '@vue/test-utils';

describe("About.vue",()=>{
    test('render inner text',()=>{
        const wrapper = shallowMount(About)

        expect(wrapper.text()).toContain('about')
    })
})