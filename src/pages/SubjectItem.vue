<template>
  <div id="SubjectItem">
    <div class="subjectWrapper" v-if="!showLoading">
      <div>{{subject.title}} {{subject.original_title}} <span>({{subject.year}})</span></div>
      <div>
        <div>
          <img :src="subject.images.medium" />
        </div>
        <div>
          <p><span>导演:</span>{{directors}}</p>
          <p><span>主演:</span>{{casts}}</p>
        </div>
      </div>
    </div>
    <loading v-show="showLoading"></loading>
  </div>
</template>
<script>
import {mapState} from 'vuex'
import loading from '../components/loading.vue'

export default {
  name: 'SubjectItem',
  data () {
    return {
      showLoading: true
    }
  },
  computed: mapState({
    subject: state => state.SubjectItem.subject,
    directors: state => state.SubjectItem.directors,
    casts: state => state.SubjectItem.casts
  }),
  methods: {
    getSingleSubject (classify, id) {
      this.$store.dispatch({
        type: 'getSingleSubject',
        id: id,
        classify: classify
      }).then((res) => {
        this.showLoading = false
      })
    }
  },
  created () {
    const id = this.$route.params.id
    const classify = this.$route.params.classify
    this.getSingleSubject(classify, id)
  },
  components: {loading}
}
</script>
