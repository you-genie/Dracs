<template>
  <v-card 
    outlined 
    class="ma-3">
    <v-card-title primary-title>
      {{ questionInfo.title }}
    </v-card-title>
    <v-list three-lines
      dense>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>I asked this</v-list-item-title>
          <v-list-item-subtitle>
            <small>I am interested in:  </small>
            <v-chip x-small label class="ma-1">{{user.interestedArea}}</v-chip>
          </v-list-item-subtitle>
          <v-list-item-subtitle>
            <small> I took these classes: </small>
            <v-chip x-small color="green lighten-3" label class="ma-1"
              v-for="(course, index) in user.certificates"
              :key="index">{{courses[course].code}}</v-chip>
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-card-text>
      <span class="d-inline-block">
        {{questionInfo.body}}
      </span>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <edit-button
        :questionId="questionId"
        :title="questionInfo.title"
        :body="questionInfo.body" />
    </v-card-actions>
  </v-card>
</template>

<script>
 import {
    mapState,
  } from 'vuex'

  export default {
    name: "MyQuestionInfoCard",
    data: () => ({

    }),
    props: {
      questionId: String
    },
    components: {
      EditButton: () => import('@/components/cards/EditMyQuestionInfoCard')
    },
    computed: {
      ...mapState(['majorTags', 'user', 'users', 'courses', 'my_questions']),
      questionInfo () {
        return this.my_questions[this.questionId]
      }
    }
  }
</script>