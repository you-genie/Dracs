<template>
    <v-list >
        <v-list-item disabled ripple=false two-line
            @click="menu=false">
            <v-list-item-content>
                <v-list-tile-title><small>{{enName}}</small></v-list-tile-title>
                <v-list-tile-sub-title><small>{{koName}}</small></v-list-tile-sub-title>
            </v-list-item-content>
        </v-list-item>
        <v-divider/>
        <v-list-item
            :light="up_selected"
            @click="upvote">
            <v-list-item-content>
                <v-list-item-subtitle><small>Upvote</small></v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
                <v-icon v-if="!up_selected" size=20>mdi-thumb-up-outline</v-icon>
                <v-icon v-if="up_selected" size=20>mdi-thumb-up</v-icon>
            </v-list-item-action>
        </v-list-item>
        <v-list-item
            :light="down_selected"
            @click="downvote">
            <v-list-item-content>
                <v-list-item-subtitle><small>Downvote</small></v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
                <v-icon v-if="!down_selected" size=20>mdi-thumb-down-outline</v-icon>
                <v-icon v-if="down_selected" size=20>mdi-thumb-down</v-icon>
            </v-list-item-action>
        </v-list-item>
        <v-list-item
            :light="hmm_selected"
            @click="hmm">
            <v-list-item-content>
                <v-list-item-subtitle><small>Hmm?</small></v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-avatar size=20>
                  <img src="@/assets/hmm.png">
              </v-avatar>
            </v-list-item-action>
        </v-list-item>
    </v-list>
</template>

<script>
    export default {
        name: "VoteList",
        data: () => ({
        }),
        props: {
            enName: String,
            koName: String,
            up_selected: Boolean,
            down_selected: Boolean,
            hmm_selected: Boolean
        },
        methods: {
            upvote: function() {
                if (!this.up_selected) {
                    this.sendUp()
                    if (this.down_selected) {
                        this.sendUp()
                        this.down_selected = false
                    }
                    this.up_selected = true
                } else {
                    this.sendDown()
                    this.up_selected = false
                }
            },
            downvote: function() {
                if (!this.down_selected) {
                    this.sendDown()
                    if (this.up_selected) {
                        this.sendDown()
                        this.up_selected = false
                    }
                    this.down_selected = true
                } else {
                    this.sendUp()
                    this.down_selected = false
                }
            },
            hmm: function() {
                if (!this.hmm_selected) {
                    this.$emit('hmm')
                    this.hmm_selected = true
                    this.up_selected = false
                    this.down_selected = false
                } else {
                    this.hmm_selected = false
                    this.up_selected = false
                    this.down_selected = false
                }
            },
            sendUp: function() {
                this.$emit('upvote')
            },
            sendDown: function() {
                this.$emit('downvote')
            }
        }
    }


</script>