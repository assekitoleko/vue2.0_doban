import Vue from 'vue'
import Router from 'vue-router'
// import Index from '../pages/Index'
import Movie from '../pages/Movie'
import Book from '../pages/Book'
import BookIndex from '../pages/BookIndex'
import SubjectItem from '../pages/SubjectItem'
import Login from '../pages/Login'
import SubjectList from '../pages/SubjectList'
import MovieIndex from '../pages/MovieIndex'
import Celebrity from '../pages/Celebrity'
import User from '../pages/User'
import BookItemList from '../pages/BookItemList'
import Register from '../pages/register'
// import store from '../store/index'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/movie'
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
      path: '/book',
      name: 'Book',
      component: Book,
      children: [
        {
          path: 'search/:content',
          name: 'BookItemList',
          component: BookItemList
        },
        {
          path: '',
          name: 'BookIndex',
          component: BookIndex
        }
      ]
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
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    }
  ]
})

// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.requireAuth)) {
//     if (store.state.login.user_id) {
//       next()
//     } else {
//       next({
//         path: '/login',
//         query: {
//           redirect: to.fullPath
//         }
//       })
//     }
//   } else {
//     next()
//   }
// })
