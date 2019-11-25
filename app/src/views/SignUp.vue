<template>
  <div class="signup">
    <v-row dense justify="space-around" align="center">
      <v-card outlined width="80%">
        <v-card-title primary-title>
          Welcome to DragCS!
        </v-card-title>
        <v-card-text>
          <v-container dense fluid>
            <v-row dense align="center">
              <v-col cols="4">
                <v-subheader>E-mail</v-subheader>
              </v-col>
              <v-col cols="8">
                <v-text-field label="E-mail" v-model="email" ></v-text-field>
              </v-col>
            </v-row>
            <v-row dense align="center">
              <v-col cols="4">
                <v-subheader>password</v-subheader>
              </v-col>
              <v-col cols="8">
                <v-text-field
                  v-model="password"
                  type="password"
                  name="password"
                  label="password"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row dense align="center">
              <v-col cols="6">
                <v-subheader>How many semesters did you take?</v-subheader>
              </v-col>
              <v-col cols="6">
                <v-select
                  dense
                  :items="semesters"
                  suffix="semesters"
                  v-model="currentSemester"
                  label="e.g. 8th"
                  persistent-hint
                  hint="Including this semester"
                ></v-select>
              </v-col>
            </v-row>
            <v-row dense align="center">
              <v-col cols="3">
                <v-subheader>Major</v-subheader>
              </v-col>
              <v-col cols="3">
                <v-select
                  dense
                  :items="majorNames"
                  v-model="major"
                  label="major"
                  persistent-hint
                  hint="주전공"
                ></v-select>
              </v-col>
              <v-col cols="3">
                <v-subheader>Double major</v-subheader>
              </v-col>
              <v-col cols="3">
                <v-select
                  dense
                  :items="subMajorNames"
                  v-model="doubleMajor"
                  label="double major"
                  persistent-hint
                  hint="복수 전공"
                ></v-select>
              </v-col>
              <v-col cols="3">
                <v-subheader>Minor</v-subheader>
              </v-col>
              <v-col cols="3">
                <v-select
                  dense
                  :items="subMajorNames"
                  v-model="minor"
                  label="minor"
                  persistent-hint
                  hint="부전공"
                ></v-select>
              </v-col>
              <v-col cols="3">
                <v-subheader>Interested area in CS</v-subheader>
              </v-col>
              <v-col cols="3">
                <v-select
                  dense
                  :items="interestedAreas"
                  v-model="interestedArea"
                  label="e.g. AI"
                  persistent-hint
                  hint="Undecided if you don't have any"
                ></v-select>
              </v-col>
              <v-col cols="3">
                <v-subheader>Certificates</v-subheader>
              </v-col>
              <v-col cols="9" sm="9">
                <v-select
                  :menu-props="{ maxHeight: '400' }"
                  :items="longCourseNames"
                  item-text="text"
                  item-vaue="value"
                  v-model="certificates"
                  multiple
                  label="e.g. CS101, CS109"
                >
                <template v-slot:selection="{ item, index }">
                    <v-chip v-if="index < 6">
                      <span>{{ courses[item.value].code }}</span>
                    </v-chip>
                    <span
                      v-if="index === 5"
                      class="grey--text caption"
                    >(+{{ certificates.length - 5 }} others)</span>
                  </template>
                </v-select>
              </v-col>
            </v-row>
          </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text @click="processSignUp">Sign Up!</v-btn>
          </v-card-actions>
      </v-card>
    </v-row>
  </div>
</template>

<script>
import firebase from "firebase";
import { db } from "../main";
import store from '../store'
import { mapState, mapGetters } from 'vuex'

export default {
  name: "signUp",
  data() {
    return {
      email: "",
      password: "",
      currentSemester: "",
      major: "",
      minor: "",
      doubleMajor: "",
      interestedArea: "",
      certificates: [],
      semesters: ["1", "2", "3", "4", "5", "6", "7", "8", "9+"],
    };
  },
  computed: {
    ...mapState(['majorTags', 'interestedAreas', 'courses']),
    ...mapGetters(['majorNames', 'subMajorNames', 'longCourseNames'])
  },
  methods: {
    processSignUp: function() {
      // first, check the value
      if (
        this.email == "" ||
        this.password == "" ||
        this.currentSemester == "" ||
        this.major == "" ||
        this.minor == "" ||
        this.doubleMajor == "" ||
        this.interestedArea == ""
      ) {
        alert("Please fill in all the informations!");
        return;
      }

      // post processing
      if (this.currentSemester == "9+") {
        this.currentSemester = "9";
      }
      this.currentSemester = parseInt(this.currentSemester);

      switch (this.major) {
        case "Undecided":
          this.major = -1;
          break;
        case "CS":
          this.major = 0;
          break;
        case "EE":
          this.major = 1;
          break;
        case "MAS":
          this.major = 2;
          break;
        case "Others":
          this.major = 3;
      }

      switch (this.doubleMajor) {
        case "None":
          this.doubleMajor = -1;
          break;
        case "CS":
          this.doubleMajor = 0;
          break;
        case "EE":
          this.doubleMajor = 1;
          break;
        case "MAS":
          this.doubleMajor = 2;
          break;
        case "Others":
          this.doubleMajor = 3;
      }

      switch (this.minor) {
        case "None":
          this.minor = -1;
          break;
        case "CS":
          this.minor = 0;
          break;
        case "EE":
          this.minor = 1;
          break;
        case "MAS":
          this.minor = 2;
          break;
        case "Others":
          this.minor = 3;
      }

      if (this.interestedArea == "None") {
        this.interestedArea = "Not decided yet!";
      }

      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(
          user => {
            let data = {
              currentSemester: this.currentSemester,
              major: this.major,
              minor: this.minor,
              doubleMajor: this.doubleMajor,
              interestedArea: this.interestedArea,
              reputationPts: 0,
              certificates: this.certificates,
              userID: firebase.auth().currentUser.uid
            };
            (user)
            db.collection("users").doc().set(data);
            store.commit('changeLoginState', true)
            store.dispatch('fetchAll');
            setTimeout(() => {
                this.$router.replace('/')
            }, 1000)          },
          error => {
            alert(error);
          }
        );
    }
  }
};
</script>