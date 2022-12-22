import SongItem from '@/components/SongItem.vue'
import { shallowMount ,RouterLinkStub} from '@vue/test-utils'
describe('SongItem.vue',()=>{
    test('render song.display_name',()=>{

        const song ={
            display_name :'test'
        }

        const wrapper  = shallowMount(SongItem,{
            props:{
                song
            },
            global:{
                components:{
                    'router-link': RouterLinkStub
                }
            }
        })

        const compositionAuther  = wrapper.find('.text-gray-500')

        expect(compositionAuther.text()).toBe(song.display_name)
    })

    test('render song.docId',()=>{

        const song ={
            docId :'abc'
        }

        const wrapper  = shallowMount(SongItem,{
            props:{
                song
            },
            global:{
                components:{
                    'router-link': RouterLinkStub
                }
            }
        })


        expect(wrapper.attributes().id).toBe(`song-id-${song.docId}`)
    })
})