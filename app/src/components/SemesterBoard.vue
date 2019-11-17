<template>
    <v-card
        max-width="45%"
        class="auto"
        width="70%"
        height="500"
    >
        <v-card-title>{{semester}}</v-card-title>
        <v-divider></v-divider>
        <v-card 
            outlined
            class="ma-3"
            height="15%">
            <v-card-text><span>Selected by User</span></v-card-text>
        </v-card>
        <v-card 
            class="ma-3"
            height="60%"
            outlined
            v-bind:color="cardColor"
            v-on:dragover="allowDrop"
            v-on:dragleave.prevent="leaveDrag"
            v-on:drop="drop">
            <v-card-text><span>On Vote</span></v-card-text>
            <v-container>
                <v-div class="mx-1" v-for="(item, index) in items" v-bind:key="index">
                    <v-chip >
                        {{item.code}}
                    </v-chip>
                </v-div> 
            </v-container>
        </v-card>
    </v-card>
</template>
<script>
    export default {
        name: "DragBoard",
        props: {
            semester: String,
            items: Array,
            semesterId: Number
        },
        data: () => ({
            text: "temp",
            cardColor: "undefined"
        }),
        methods: {
            leaveDrag: function() {
                this.$emit('drag-leave-semester')
                this.cardColor = "undefined"
            },
            allowDrop: function(event) {
                event.preventDefault();
                this.$emit('drag-allow-semester', this.semesterId)
                this.cardColor = "grey darken-2"
            },
            drop: function() {
                event.preventDefault();
                this.$emit('drag-dropped-semester', this.semesterId)
                this.cardColor = "undefined"
            }
        }
    }
</script>