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

Vue.use(Router)

export default new Router({
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
      component: Book
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
    }
  ]
})
