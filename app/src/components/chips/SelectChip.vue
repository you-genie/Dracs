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
                :color="votes >= 0?good_color:bad_color"
            >
                {{code}}
                <v-avatar right small color="white">{{votes}}</v-avatar>
            </v-chip>                    
        </template>
        <v-card
            max-width="150">
            <vote-list v-if="!myChip"
                v-on:upvote="upvote"
                v-on:downvote="downvote"
                v-on:hmm="hmm"
                :en-name="enName"
                :ko-name="koName"/>
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
    export default {
        name: "YourSelectChip",
        data: () => ({
            good_color: "green lighten-1",
            bad_color: "red lighten-1",
        }),
        components: {
            VoteList: () => import('@/components/VoteList')
        },
        props: {
            code: String,
            enName: String,
            koName: String,
            courseId: Number,
            votes: Number,
            myChip: Boolean,
            voted: Boolean
        },
        methods: {
            undo: function() {
                this.$emit('deselect', this.courseId)
            },
            downvote: function() {
                this.$emit('vote', this.courseId, 'downvote')
            },
            upvote: function() {
                this.$emit('vote', this.courseId, 'upvote')
            },
            hmm: function() {
                this.$emit('vote', this.courseId, 'hmm')
            }

        }
    }


</script>