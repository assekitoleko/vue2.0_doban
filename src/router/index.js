import Vue from 'vue'
import Router from 'vue-router'
import Index from '../pages/Index'
import Movie from '../pages/Movie'
import Music from '../pages/Music'
import Book from '../pages/Book'
import Group from '../pages/Group'
import SubjectItem from '../pages/SubjectItem'

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
      component: Movie
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
    }
  ]
})
