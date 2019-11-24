<template>
    <div id="Search">
      <v-container>
        <search-bar />
        <v-row>
          <question-board />
        </v-row>
      </v-container> 
    </div>
</template>

<script>
// this is page for search.
// import banner, search-card(containing search query and selection cards, question-board(with question-cards(component)) component. Fill in banner plz.
  import {
    mapState, 
    // mapGetters
  } from 'vuex'
  export default {
      name: 'Search',
      props: {

      },
      components: {
        SearchBar: () => import('@/components/SearchBar'),
        QuestionBoard: () => import('@/components/QuestionBoard'),
        ...mapState(['users', 'user']),
      },
      data: () => ({
      }),
      computed: {
      }
    }
</script>