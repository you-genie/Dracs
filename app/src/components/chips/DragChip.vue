<template>
    <v-tooltip bottom>
        <template v-slot:activator="{ on }">
            <v-chip draggable light
                class="ma-2"
                :color="nonselect"
                @dragstart="drag"
                @drag.prevent="drag"
                @dragend="end"
                v-on="on"
            >
                {{code}}
            </v-chip>
        </template>
        <span>[{{enName}}] {{koName}}</span>
    </v-tooltip>
</template>

<script>
    export default {
        name: "DragChip",
        data: () => ({
            nonselect: "orange"
        }),
        props: {
            code: String,
            enName: String,
            koName: String,
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