<template>
  <v-textarea
    class="mx-2"
    v-model="text"
    label="comments..."
    rows="1"
    auto-grow
    counter
    maxlength="300"
    clearable
    @keyup.enter="postMessage">          
  </v-textarea>
</template>

<script>
  export default {
    name: "CommentTextArea",
    data: () => ({
      text: ""
    }),
    methods: {
      postMessage() {
        if (this.text !== "") {
          this.$emit("post-message", this.text.trim())
          this.text = ""
        }
      }
    }
  }
</script>