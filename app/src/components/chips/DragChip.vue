<template>
    <v-tooltip bottom>
        <template v-slot:activator="{ on }">
            <v-chip draggable light
                class="ma-2"
                small
                :color="nonselect"
                @dragstart="drag"
                @drag.prevent="drag"
                @dragend="end"
                v-on="on"
            >
                {{courseData.code}}
            </v-chip>
        </template>
        <span>[{{courseData.enName}}] {{courseData.koName}}</span>
    </v-tooltip>
</template>

<script>
    import {
        mapState
    } from 'vuex'

    export default {
        name: "DragChip",
        data: () => ({
            nonselect: "orange",
        }),
        computed: {
            ...mapState(['courses']),
            courseData() {
                return this.courses[this.index]
            }
        },
        props: {
            index: Number,
            courseId: Number
        },
        methods: {
            drag () {
                this.$emit('drag-on', this.courseId)
            },
            end () {
                this.$emit('drag-end', this.courseId)
            }
        }
    }


</script>