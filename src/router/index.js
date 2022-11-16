import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/outside/Login'
import Main from '../views/main/Index'
import BranchOffice from '../views/main/BranchOffice'
import Posts from '../views/main/Posts'
import Products from '../views/main/Products'
import Home from '../views/main/Home'
import InternalProducts from '../views/main/InternalProducts'
import NotFound from '../views/outside/NotFound'
import Brands from '../views/main/Brands'

Vue.use(VueRouter)

const routes = [{
  path:'/',
  redirect:{
    name:'Home'
  }
},{
    path: '/login',
    name: 'Login',
    component: Login
  }, {
    path: '*',
    name: 'NotFound',
    component: NotFound
  },
  {
    path: '/main',
    name: 'Main',
    component: Main,
    redirect: {
      name: 'Home'
    },
    children: [{
        path: 'home',
        name: 'Home',
        component: Home
      },
      {
        path: 'posts',
        name: 'Posts',
        component: Posts
      },
      {
        path: 'products',
        name: 'Products',
        component: Products
      },
      {
        path: 'branchOffice',
        name: 'BranchOffice',
        component: BranchOffice
      },
      {
        path: 'internalProducts',
        name: 'InternalProducts',
        component: InternalProducts
      },
      {
        path: 'brands',
        name: 'Brands',
        component: Brands
      }
    ]

  },



]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router