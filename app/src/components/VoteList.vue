<template>
    <v-list >
        <v-list-item disabled ripple=false>
            <v-list-item-content>
                <v-list-item-title><small>{{enName}}</small></v-list-item-title>
                <v-list-item-subtitle><small>{{koName}}</small></v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>
        <v-divider/>
        <v-list-item>
            <v-btn-toggle
                v-model="vote"
                dense
                group
                @change="sendVote"
            >
              <v-btn value="up">
                <v-icon size=20>mdi-thumb-up</v-icon><span>{{defaultUp}}</span>
              </v-btn>
              <v-btn value="down">
                <v-icon size=20>mdi-thumb-down</v-icon> {{defaultDown}}
              </v-btn>
              <v-btn value="hmm">
                <v-avatar size=20>
                  <img src="@/assets/hmm.png"> 
                </v-avatar> Not sure {{defaultHmm}}
              </v-btn>
            </v-btn-toggle>
        </v-list-item>
    </v-list>
</template>

<script>
    export default {
        name: "VoteList",
        data: () => ({
            vote: undefined,
            prev: undefined,
            up: this.defaultUp,
            down: this.defaultDown,
            hmm: this.defaultHmm
        }),
        props: {
            enName: String,
            koName: String,
            defaultUp: Number,
            defaultDown: Number,
            defaultHmm: Number
        },
        methods: {
            sendVote: function() {
                this.$emit('send-vote', this.vote, this.prev)
                this.prev = this.vote
            }
        }
    }


</script>