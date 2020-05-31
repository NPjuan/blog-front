import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Edit from '../views/Edit'
import Article from "../views/Article"


Vue.use(VueRouter)

const routes = [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/about',
      name: 'About',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
    path: '/edit',
    name: 'edit',
    component: Edit
    },
    {
      path: '/article/:id',
      name: 'article',
      props: true,
      component: () => import(/* webpackChunkName: "about" */ '../views/Article.vue')
    }
]

const router = new VueRouter({
  routes
})

export default router
