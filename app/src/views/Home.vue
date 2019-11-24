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
            <question-board v-if="n == 1" />
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
    mapState, 
    // mapGetters
  } from 'vuex'
  export default {
      name: 'Home',
      components: {
        SearchBar: () => import('@/components/SearchBar'),
        QuestionBoard: () => import('@/components/QuestionBoard'),
        MyBoard: () => import('@/components/MyQuestionBoard'),
        ...mapState(['users', 'user']),
      },
      data: () => ({
        questions: [
          {
            title: "I don't know",
            body: "Can somebody help me with this question?"
          },
          {
            title: "I want to do internship",
            body: "Can somebody help me with this question?"
          },
          {
            title: "How to study AI",
            body: "Can somebody help me with this question?"
          },
        ],
        my_questions: [
          {
            title: "Further CS",
            body: "I want to achieve SIMWHA jungong, could you help me? and some very long long long long long long long long long long long long lsdfasdf;laskdjf;lkasjdf;lkjas;dlkfj;aslkdjf;lksje;ljf;lij;lijf;sdfs;dlifj;lij;lij;lijij;ijeieifjlsiejf selfijsl eifjlisj feisleijffeisleijffeisleijffeisleijffeisleijffeisleijffeisleijffeisleijffeisleijffeisleijffeisleijffeisleijffeisleijffeisleijffeisleijffeisleijffeisleijffeisleijffeisleijffeisleijffeisleijffeisleijffeisleijffeisleijffeisleijffeisleijffeisleijffeisleijffeisleijffeisleijffeisleijffeisleijffeisleijffeisleijffeisleijffeisleijffeisleijffeisleijffeisleijffeisleijffeisleijffeisleijffeisleijffeisleijffeisleijffeisleijffeisleijffeisleijffeisleijffeisleijffeisleijffeisleijffeisleijffeisleijf liji"
          },
          {
            title: "Abroad internship",
            body: "anyone done internship?"
          }
        ],
      }),
      computed: {
        question_data(n) {
          return n == 0 ? this.questions : this.my_questions
        }
      }
    }
</script>