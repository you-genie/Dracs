<template>
  <v-row>
    <v-textarea
      readonly
      outlined
      
      auto-grow
      :label="numLabel"
      rows="1"
      dense
      :value="comment">
      <template #prepend>
        <v-avatar size="35" :color="color"><span class="white--text">{{major.slice(0,2)}}</span></v-avatar>
      </template>
    </v-textarea>

  </v-row>
</template>

<script>
  export default {
    name: "Comment",
    data: () => ({}),
    props: ['comment', 'color', 'major', 'semesters'],
    computed: {
      numLabel() {
        let grade = this.semesters/2

        return grade < 0 ? "Asker" : grade <= 1 ? "freshman" : grade <= 2 ? "sophomore" : grade <= 3 ? "junior" : "senior"
      }
    }
  }
</script>