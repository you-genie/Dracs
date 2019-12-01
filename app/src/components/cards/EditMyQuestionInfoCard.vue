<template>
  <v-dialog
    v-model="dialog"
    width="500">
    <template v-slot:activator="{ on }">
      <v-btn
        color="light-green"
        dark
        text
        v-on="on">
        Edit
      </v-btn>
    </template>
    <v-card
      outlined>
      <v-card-title primary-title>
        Edit Question
      </v-card-title>
      <v-card-text>
        <v-text-field
          label="Edit Title"
          v-model="title"
          >
        </v-text-field>
        <v-textarea
          label="Edit Body"
          v-model="body" />

      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          text
          @click="submitEdit"
        >
          Submit
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
 import {
    mapActions
  } from 'vuex'

  export default {
    name: "MyQuestionInfoCard",
    data: () => ({
      dialog: false
    }),
    props: {
      questionId: String,
      title: String,
      body: String
    },
    methods: {
      ...mapActions(['editQuestion']),
      submitEdit() {
        this.editQuestion({
          questionId: this.questionId,
          title: this.title,
          body: this.body
        })
        this.dialog = false
      }
    }
  }
</script>