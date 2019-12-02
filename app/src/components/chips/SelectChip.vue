<template>
    <v-menu
        v-model="menu"
        bottom
        offset-x
        transition="scale-transition"
        origin="top left"
    >
        <template v-slot:activator="vote">
            <v-chip light
                small
                :disabled="selectChip"
                v-on="vote.on"
                class="ma-2"
                :outlined="isMine ? true : false"
                :color="selectChip? select_color: Object.keys(votes.up).length - Object.keys(votes.down).length >= 0?good_color:bad_color"
            >
                {{courseData.code}}
                <v-avatar right small size=10 color="white">{{Object.keys(votes.up).length - Object.keys(votes.down).length}}</v-avatar>
            </v-chip>                    
        </template>
        <v-card
            max-width="300">
            <vote-list v-if="!isMine && loggedIn"
                v-on:send-vote="sendVote"
                v-on:reset="reset"
                :default-up="Object.keys(votes.up).length"
                :default-down="Object.keys(votes.down).length"
                :default-hmm="Object.keys(votes.hmm).length"
                :en-name="courseData.enName"
                :ko-name="courseData.koName"/>
            <v-list v-if="isMine">
                <v-list-item
                    @click="undo">
                    <v-list-item-content>
                        <v-list-tile-sub-title><small>Undo</small></v-list-tile-sub-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-card>
    </v-menu>
    
</template>

<script>
    import {
        mapState
    } from 'vuex'
    import * as firebase from 'firebase'

    export default {
        name: "YourSelectChip",
        data: () => ({
            good_color: "green lighten-1",
            bad_color: "red lighten-1",
            hmm_color: "yellow lighten-1",
            select_color: "grey",
            menu: false,
            reset: true
        }),
        computed: {
            ...mapState(['courses', 'user']),
            courseData () {
                return this.courses[this.index];
            },
            isMine () {
                const isUp = this.votes.up.hasOwnProperty(this.user.userID) && Object.keys(this.votes.up).length == 1
                const isDown = Object.keys(this.votes.down).length == 0
                const isHmm = Object.keys(this.votes.hmm).length == 0
                return isUp && isDown && isHmm
            },
            loggedIn() {
                return firebase.auth().currentUser
            }
        },
        components: {
            VoteList: () => import('@/components/VoteList')
        },
        props: {
            courseId: Number,
            votes: Object,
            myChip: Boolean,
            index: Number,
            selectChip: Boolean
        },
        methods: {
            undo: function() {
                this.$emit('deselect', this.courseId)
            },
            sendVote: function(vote, prev) {
                this.$emit('vote', this.courseId, vote)
            }

        }
    }


</script>