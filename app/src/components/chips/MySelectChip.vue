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
                v-on="vote.on"
                class="ma-2"
                :color="selectChip? select_color: votes.up - votes.down >= 0?good_color:bad_color"
            >
                {{courseData.code}}
                <v-avatar right small color="white">{{votes.up - votes.down}}</v-avatar>
            </v-chip>                    
        </template>
        <v-card
            max-width="300">
            <v-list v-if="!selectChip">
                <v-list-item
                    @click="select">
                    <v-list-item-content>
                        <v-list-tile-sub-title><small>Select</small></v-list-tile-sub-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
            <v-list v-if="selectChip">
                <v-list-item
                    @click="undo">
                    <v-list-item-content>
                        <v-list-tile-sub-title><small>Undo select</small></v-list-tile-sub-title>
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
            hmm_color: "yellow lighten-1",
            select_color: "grey lighten-2"
        }),
        computed: {
            ...mapState(['courses']),
            courseData () {
                return this.courses[this.index];
            }
        },
        props: {
            courseId: Number,
            votes: Object,
            selectChip: Boolean,
            index: Number
        },
        methods: {
            undo: function() {
                this.$emit('deselect', this.courseId)
            },
            select: function() {
                this.$emit('select', this.courseId)
            }

        }
    }


</script>