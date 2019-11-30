<template>
    <div id="Search">
      <v-container>
        <search-bar />
        <v-row>
          <question-board 
            :questionIdLists="searchResQuestions"/>
        </v-row>
      </v-container> 
    </div>
</template>

<script>
// this is page for search.
// import banner, search-card(containing search query and selection cards, question-board(with question-cards(component)) component. Fill in banner plz.
  import {
    mapState,mapActions 
    // mapGetters
  } from 'vuex'
  export default {
      name: 'Search',
      props: {
      },
      mounted() {
      },
      components: {
        SearchBar: () => import('@/components/SearchBar'),
        QuestionBoard: () => import('@/components/boards/QuestionBoard'),
      },
      data: () => ({
      }),
      computed: {
        ...mapState(['users', 'user', 'searchResQuestions']),
      },
      methods: {
        ...mapActions(['getSearchData'])
      }
    }
</script>