import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '@/components/Hello'
import Home from '../pages/Home'
import Group from '../pages/Group'
import Book from '../pages/Book'
import Movie from '../pages/Movie'
import Music from '../pages/Music'
import Index from '../pages/Index'
import NotFound from '../pages/NotFound'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '',
      redirect: '/pages'
    },
    {
      path: '/pages',
      name: 'Home',
      component: Home,
      children: [
        {
          path: '',
          name: 'Index',
          component: Index
        },
        {
          path: 'book',
          name: 'Book',
          component: Book
        },
        {
          path: 'music',
          name: 'Music',
          component: Music
        },
        {
          path: 'Movie',
          name: 'Movie',
          component: Movie
        },
        {
          path: 'group',
          name: 'Group',
          component: Group
        },
        {
          path: '*',
          name: 'NotFound',
          component: NotFound
        }
      ]
    },
    {
      path: '*',
      name: 'NotFound',
      component: NotFound
    }
  ]
})
