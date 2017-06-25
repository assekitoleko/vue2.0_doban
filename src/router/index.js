import Vue from 'vue'
import Router from 'vue-router'
import Index from '../pages/Index'
import Movie from '../pages/Movie'
import Music from '../pages/Music'
import Book from '../pages/Book'
import Group from '../pages/Group'
import SubjectItem from '../pages/SubjectItem'
import Login from '../pages/Login'
import SubjectList from '../pages/SubjectList'
import MovieIndex from '../pages/MovieIndex'
import Celebrity from '../pages/Celebrity'
import User from '../pages/User'
import store from '../store/index'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/movie',
      name: 'Movie',
      component: Movie,
      children: [
        {
          path: ':type',
          name: 'SubjectList',
          component: SubjectList
        },
        {
          path: '',
          name: 'MovieIndex',
          component: MovieIndex
        },
        {
          path: 'search/:content',
          name: 'SubjectList',
          component: SubjectList
        },
        {
          path: 'celebrity/:id',
          name: 'celebrity',
          component: Celebrity
        }
      ]
    },
    {
      path: '/music',
      name: 'Music',
      component: Music
    },
    {
      path: '/book',
      name: 'Book',
      component: Book,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/group',
      name: 'Group',
      component: Group
    },
    {
      path: '/:classify/subject/:id',
      name: 'SubjectItem',
      component: SubjectItem
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/user/:id',
      name: 'User',
      component: User,
      meta: {
        requireAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireAuth)) {
    console.log(from, to)
    if (store.state.login.user_id) {
      next()
    } else {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
    }
  } else {
    next()
  }
})

export default router
