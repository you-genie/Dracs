<template>
    <div id="home">
      <v-container>
        <search-bar />
        <v-row>
          <v-col 
            v-for="n in 2"
            :key="n"
            cols="12"
            sm="6">
            <question-board v-if="n == 1" 
              :questionIdLists="fitArticleList"/>
            <my-board v-else />
          </v-col>
        </v-row>
      </v-container> 
    </div>
</template>

<script>
// this is page for search.
// import banner, search-card(containing search query and selection cards, question-board(with question-cards(component)) component. Fill in banner plz.
  import {
    mapState, mapActions 
    // mapGetters
  } from 'vuex'
  export default {
      name: 'Home',
      components: {
        SearchBar: () => import('@/components/SearchBar'),
        QuestionBoard: () => import('@/components/QuestionBoard'),
        MyBoard: () => import('@/components/MyQuestionBoard'),
      },
      beforeMount() {
        this.fetchAll();
      },
      mounted () {
        this.fetchQuestion();
      },
      data: () => ({
      }),
      computed: {
        ...mapState(['users', 'user', 'fitArticleList']),
        question_data(n) {
          return n == 0 ? this.questions : this.my_questions
        }
      },
      methods: {
        ...mapActions(['fetchQuestion', 'fetchAll'])
      }
    }
</script>