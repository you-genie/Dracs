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
                v-on="vote.on"
                class="ma-2"
                :color="votes.up - votes.down >= 0?good_color:bad_color"
            >
                {{courseData.code}}
                <v-avatar right small color="white">{{votes.up - votes.down}}</v-avatar>
            </v-chip>                    
        </template>
        <v-card
            max-width="300">
            <vote-list v-if="!myChip"
                v-on:send-vote="sendVote"
                v-on:reset="reset"
                :default-up="votes.up"
                :default-down="votes.down"
                :default-hmm="votes.hmm"
                :en-name="courseData.enName"
                :ko-name="courseData.koName"/>
            <v-list v-if="myChip">
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

    export default {
        name: "YourSelectChip",
        data: () => ({
            good_color: "green lighten-1",
            bad_color: "red lighten-1",
            hmm_color: "yellow lighten-1"
        }),
        computed: {
            ...mapState(['courses']),
            courseData () {
                return this.courses[this.index];
            }
        },
        components: {
            VoteList: () => import('@/components/VoteList')
        },
        props: {
            courseId: Number,
            votes: Object,
            myChip: Boolean,
            index: Number
        },
        methods: {
            undo: function() {
                this.$emit('deselect', this.courseId)
            },
            sendVote: function(vote, prev) {
                this.$emit('vote', this.courseId, vote, prev)
            }

        }
    }


</script>