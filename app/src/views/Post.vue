<template>
    <div id="Post">
      <v-container>
        <v-card>
          <v-card-title primary-title>
            Post your question
          </v-card-title>
          <v-card-text>
            <v-form
              v-model="form"
              class="ma-3">
              <v-text-field
                v-model="title"
                label="title"
                required
              ></v-text-field>
              <v-textarea
                v-model="body"
                autogrow
                label="text"
                required
                hint="Write down what you want to ask specially."
              ></v-textarea>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text @click="post">submit</v-btn>
          </v-card-actions>
        </v-card>
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
      name: 'Post',
      props: {

      },
      computed: {
        // SearchBar: () => import('@/components/SearchBar'),
        // QuestionBoard: () => import('@/components/QuestionBoard'),
        ...mapState(['users', 'user', 'courses']),
      },
      data: () => ({
        title: "",
        body: "",
        form: false
      }),
      methods: {
        post () {
          if (this.form) {
            const question = {
              title: this.title,
              body: this.body,
              userID: this.user.userID,
              semesters: [
                { semester: "2020 Spring", courses: []},
                { semester: "2020 Fall", courses:[] },
                { semester: "2021 Spring", courses: []}
              ],
              courses: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26]
            }

            this.$emit('post', question)            
          }
          
        }
      }
    }
</script>