
<template>
  <v-container>
    <v-menu 
      :close-on-content-click="false"
      :nudge-width="200"
      offset-y v-model="menu">
      <template v-slot:activator="{ on }">
        <v-form>
          <v-container>
            <v-row class="ma-1">
              <v-chip 
                v-for="(academic, index) in academics" 
                v-bind:key="index"
                class="mx-1"
                x-small
                color="primary"
                label
                active=false>{{academic}}</v-chip>
            </v-row>
            <v-combobox
              v-on="on"
              @click="menu=true"
              v-model="queries"
              label="Search for questions"
              cache-items
              deletable-chips
              small-chips
              clearable
              multiple
              :search-input.sync="query"
              prepend-inner-icon="mdi-magnify" />
            <v-btn
              absolute
              dark
              fab
              right
              @click="goToPost"
              color="primary"
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-container>

        </v-form>

      </template>
    <v-card>
      <v-card-text>
        <header>Major</header>
        <v-container fluid>
          <v-radio-group v-model="major" row>
            <v-radio 
              v-for="(major, index) in majorNames"
              v-bind:key="index"
              :label="major"
              color="red"
              :value="major" />
          </v-radio-group>
        </v-container>
        <header>Certificates</header>
        <v-row class="px-4">
          <v-checkbox 
            class="ma-3"
            v-for="(course, index) in courseNames"
            v-bind:key="index"
            v-model="certificates"
            :label="course"
            :value="course"/>
        </v-row>
        <header>Interests</header>
        <v-row class="px-4">
          <v-checkbox 
            class="ma-3"
            v-for="(topic, index) in interestedAreas"
            v-bind:key="index"
            v-model="interests"
            :label="topic"
            :value="topic"/>
        </v-row>
      </v-card-text>
      <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="success"
            text
            @click="clickSearch"
          >
            search
          </v-btn>
        </v-card-actions>
    </v-card>

</v-menu>
</v-container>
</template>


<script>
// this is page for search.
// import banner, search-card(containing search query and selection cards, question-board(with question-cards(component)) component. Fill in banner plz.

import {
  mapActions, mapState, mapGetters
} from 'vuex'

export default {
  name: 'SearchBar',
  components: {
  },
  data: () => ({
    linked: "",
    menu: false,
    certificates: [],
    interests: [],
    courses: ["CS101", "CS201", "CS520", "CS489", "CS370", "CS950", "CS333", "CS444", "CS342"],
    query: "",
    major: "CS",
    queries: [],
    total_items: [],
  }),
  computed: {
    ...mapGetters(['majorNames', 'courseNames']),
    ...mapState(['majorTags', 'interestedAreas']),
    academics () {
      var ret = []
        // ret = ret.concat(this.queries)
      if (this.major !== undefined) {
        ret.push(this.major)
      }
      ret = ret.concat(this.certificates)
      ret = ret.concat(this.interests)
      return ret
    },
    all_queries () {
      var ret = this.academics
      return ret.concat(this.queries)
    }
  },
  methods: {
    updateTags() {
      this.$nextTick(() => {
        this.select.push(this.query);
        this.$nextTick(() => {
          this.query = "";
        });
      });
    },
    ...mapActions(['goToPost']),
    clickSearch() {
      this.menu = false
      const all_queries = {
        major: this.major,
        query: this.queries,
        certificates: this.certificates,
        interests: this.interests
      }
      this.$emit('search_click', all_queries)
    } 
  }
}
</script>