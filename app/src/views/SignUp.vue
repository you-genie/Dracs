<template>
  <div class="signup">
    <p>Welcome to DragCS!</p>
    E-mail 
    <input type="text" v-model="email" placeholder="E-mail" />
    <br />
    Password 
    <input type="password" v-model="password" placeholder="Password" />
    <br />
    How many semesters did you take, including this semester?
    <select v-model="currentSemester" style="color:#000000; background-color:#FFFFFF; -webkit-appearance: menulist;">
      <option disabled>Please choose from below.</option>
      <option>1</option>
      <option>2</option>
      <option>3</option>
      <option>4</option>
      <option>5</option>
      <option>6</option>
      <option>7</option>
      <option>8</option>
      <option>9+</option>
    </select>
    <br>
What is your major?
     <select v-model="major" style="color:#000000; background-color:#FFFFFF; -webkit-appearance: menulist;">
               <option disabled>Please choose from below.</option>
      <option>Undecided</option>
      <option>CS</option>
      <option>EE</option>
      <option>MAS</option>
      <option>Others</option>
    </select>
    <br>
    What is your dobule major, if any?
     <select v-model="doubleMajor" style="color:#000000; background-color:#FFFFFF; -webkit-appearance: menulist;">
               <option disabled>Please choose from below.</option>
      <option>None</option>
      <option>CS</option>
      <option>EE</option>
      <option>MAS</option>
      <option>Others</option>
    </select>
    <br>
    What is your minor, if any?
     <select v-model="minor" style="color:#000000; background-color:#FFFFFF; -webkit-appearance: menulist;">
               <option disabled>Please choose from below.</option>
      <option>None</option>
      <option>CS</option>
      <option>EE</option>
      <option>MAS</option>
      <option>Others</option>
    </select>
    <br>
    What is your interested area in CS, if any?
     <select v-model="interestedArea" style="color:#000000; background-color:#FFFFFF; -webkit-appearance: menulist;">
               <option disabled>Please choose from below.</option>
      <option>None</option>
      <option>CS Theory</option>
      <option>System Network</option>
      <option>Software Engineering</option>
      <option>Social Computing</option>
      <option>Visual Comptuing</option>
    <option>HCI</option>
    <option>AI</option>
    </select>
    <br>
    <v-btn @click="processSignUp">Sign Up!</v-btn>
  </div>
</template>

<script>
import firebase from "firebase";
import { db } from "../main";

export default {
  name: "signUp",
  data() {
    return {
      email: "",
      password: "",
      currentSemester: 0,
      major: "",
      minor: "",
      doubleMajor: "",
      interestedArea: "",
    };
  },
  methods: {
    processSignUp: function() {
        /* eslint-disable no-console */
        // first, check the value
        if (this.email == "" || this.password == "" || this.currentSemester == 0 ||
         this.major == "" || this.minor == "" || this.doubleMajor == "" || this.interestedArea == "") {
alert("Please fill in all the informations!")
return;
        }


      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(
            // TODO: add the information in the user DB
          user => {
            let data = {
              currentSemester: 0,
              major: -1,
              minor: -1,
              doubleMajor: -1,
              interestedArea: "",
              reputationPts: 0,
              userID: user.uid
            };
(data) (db)
            // db.collection("users").add(user);
            this.$router.replace("/");
          },
          error => {
            alert(error);
          }
        );
    }
  }
};
</script>