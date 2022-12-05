import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import Manage from '../views/ManageView.vue'
import {useUserStore} from '../stores/user'

const routes=[
  {
    name:'home',
    path:'/',
    component:HomeView
  },
  {
    name:'about',
    path:'/about',
    component:AboutView
  },
  {
    name:'manage',
    // alias:'/manage',
    path:'/manage-music',
    component:Manage,
    meta:{
      requiresAuth : true
    }





    //specific guard
    // beforeEnter: (to, from, next) => {
    //   console.log('specific guard')
    //   console.log(to,from)
    //   next()
    // }
  },
  {
    //this to redirect user with this path to another one
    //alias is another solution but this is better for seo 
    path:'/manage',
    redirect:{name:'manage'}
  },
  {
    //for 404 page or redirect it to home page
    path:'/:catchAll(.*)*',
    redirect:{name:'home'}
  }
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,

  //cange color in active class
  linkExactActiveClass:'text-yellow-500'
})


// global guard
router.beforeEach((to,from,next)=>{
  console.log(to,from)

    if(!to.meta.requiresAuth){
      next()
      return;
    }

    const store = useUserStore()

    if(store.userLoggedIn){
      next()
    }else{
      next({name:'home'})
    }


})
export default router
