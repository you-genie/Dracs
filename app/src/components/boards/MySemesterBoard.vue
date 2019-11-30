<template>
    <v-card
        max-width="33%"
        class="auto"
        width="70%"
        height="500"
    >
        <v-card-title>{{semester}}</v-card-title>
        <v-divider></v-divider>
        <v-card 
            outlined
            class="ma-3"
            height="30%">
            <v-card-text>
                <small>Selected by User</small>
                <div v-for="(course, index) in items" v-bind:key="index">
                    <select-chip 
                        v-on:deselect="deselect"
                        v-on:select="select"
                        v-if="course.selected"
                        :index="course.index"
                        :selectChip="true"
                        :votes="course.votes"
                        :courseId="index" />
                </div>
            </v-card-text>
        </v-card>
        <v-spacer></v-spacer>
        <v-card 
            class="ma-3"
            height="40%"
            outlined
            v-bind:color="cardColor">
            <v-card-text><span>Suggestions for me</span>
                <div v-for="(course, index) in items" v-bind:key="index">
                    <select-chip 
                        v-on:deselect="deselect"
                        v-on:select="select"
                        v-if="!course.selected"
                        :index="course.index"
                        :selectChip="false"
                        :votes="course.votes"
                        :courseId="index" />
                </div>

            </v-card-text>
        </v-card>
    </v-card>
</template>
<script>
    export default {
        name: "MySemesterBoard",
        props: {
            semester: String,
            items: Array,
            semesterId: Number,
        },
        components: {
            SelectChip: () => import('@/components/chips/MySelectChip')
        },
        data: () => ({
            text: "temp",
            cardColor: "undefined"
        }),
        methods: {
            deselect: function(courseId) {
                this.$emit('deselect-course', this.semesterId, courseId)
            },
            select: function(courseId) {
                this.$emit('select-course', this.semesterId, courseId)
            }
        }
    }
</script>