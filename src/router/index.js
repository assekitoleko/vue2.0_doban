import Vue from 'vue'
import Router from 'vue-router'
import Index from '../pages/Index.vue'
import Movie from '../pages/Movie.vue'
import Music from '../pages/Music.vue'
import Book from '../pages/Book.vue'
import Group from '../pages/Group.vue'
import SubjectItem from '../pages/SubjectItem.vue'

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
