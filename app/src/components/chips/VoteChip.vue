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
                :color="good?good_color:bad_color"
            >
                {{code}} {{votes}}
            </v-chip>                    
        </template>
        <v-card
            max-width="150">
            <v-list dark>
                <v-list-item
                    @click="menu = false">
                    <v-list-item-content>
                        <v-list-item-subtitle>Upvote</v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-action>
                        <v-icon>mdi-thumb-up-outline</v-icon>
                    </v-list-item-action>
                </v-list-item>
                <v-list-item
                    @click="menu = false">
                    <v-list-item-content>
                        <v-list-item-subtitle>Downvote</v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-action>
                        <v-icon>mdi-thumb-down-outline</v-icon>
                    </v-list-item-action>
                </v-list-item>
                <v-list-item
                    @click="menu = false">
                    <v-list-item-content>
                        <v-list-item-subtitle>Hmm?</v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-action>
                      <v-avatar>
                          <img src="@/assets/hmm.png">
                      </v-avatar>
                    </v-list-item-action>
                </v-list-item>
            </v-list>
        </v-card>
    </v-menu>
    
</template>

<script>
    export default {
        name: "VoteChip",
        data: () => ({
            good_color: "green lighten-1",
            bad_color: "red lighten-1",
            good: true
        }),
        props: {
            code: String,
            votes: Number,
        },
        methods: {
            upvote: function() {

            },
            downvote: function() {

            },
            hmm: function() {

            },

        }
    }


</script>