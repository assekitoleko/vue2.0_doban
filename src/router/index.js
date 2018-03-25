import Vue from 'vue'
import Router from 'vue-router'
// import Index from '../pages/Index'
import Movie from '../pages/Movie'
// import Book from '../pages/Book'
import BookIndex from '../pages/BookIndex'
import SubjectItem from '../pages/SubjectItem'
// import Login from '../pages/Login'
import SubjectList from '../pages/SubjectList'
import MovieIndex from '../pages/MovieIndex'
import Celebrity from '../pages/Celebrity'
// import User from '../pages/User'
// import BookItemList from '../pages/BookItemList'
// import Register from '../pages/register'
import Test from '../pages/test'
import BookItem from '../pages/BookItem'
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
        },
        {
          path: 'subject/:id',
          name: 'SubjectItem',
          component: SubjectItem
        }
      ]
    },
    {
      path: '/book',
      name: 'Book',
      component: () => import(/* webpackChunkName: "group-foo" */ '../pages/Book.vue'),
      children: [
        {
          path: 'search/:content',
          name: 'BookItemList',
          component: () => import(/* webpackChunkName: "group-foo" */'../pages/BookItemList.vue')
        },
        {
          path: '',
          name: 'BookIndex',
          component: BookIndex
        },
        {
          path: 'subject/:id',
          name: 'BookItem',
          component: BookItem
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import(/* webpackChunkName: "group-foo" */ '../pages/Login.vue')
    },
    {
      path: '/user/:id',
      name: 'User',
      component: () => import(/* webpackChunkName: "group-foo" */ '../pages/User.vue'),
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import(/* webpackChunkName: "aaa" */'../pages/Register.vue')
    },
    {
      path: '/test',
      name: 'Test',
      component: Test
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
