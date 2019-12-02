<template>
  <v-card>
    <v-card-text>
      <v-container>
        <comment 
          v-for="(comment, index) in comments" 
          :key="index" 
          :comment="comment.text"
          :major="comment.major"
          :semesters="comment.semesters"
          :color="comment.color"/>
        <text-area 
          v-on:post-message="postComment"/>
        </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  export default {
    name: "CommentSlot",
    components: {
      TextArea: () => import('@/components/comments/CommentTextArea'),
      Comment: () => import('@/components/comments/Comment')
    },
    props: ['questionId'],
    data: () => ({

    }),
    computed: {
      ...mapState(['user', 'my_questions', 'majorTags']),
      questionInfo () {
        return this.my_questions[this.questionId];
      },
      comments () {
        let res = this.questionInfo.comments
        return res == undefined ? [] : res
      }
    },
    methods: {
      ...mapActions(['addComment']),
      postComment(comment) {
        if (comment != "") {
          let newComment = {
            userID: this.user.userID,
            color: "#"+this.getColor(this.user.userID),
            major: "?",
            semesters: -1,
            text: comment
          }
          this.comments.push(newComment)
          this.addComment({comments: this.comments, questionId: this.questionId})
        }
      },
      hashCode(str) { // java String#hashCode
        var hash = 0;
        for (var i = 0; i < str.length; i++) {
           hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        return hash;
      }, 
      intToRGB(i) {
        var c = (i & 0x00FFFFFF).toString(16).toUpperCase();
        return "00000".substring(0, 6 - c.length) + c;
      },
      getColor(str) {
        return this.intToRGB(this.hashCode(str))
      }
    }
  }
</script>