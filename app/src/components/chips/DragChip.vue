<template>
    <v-tooltip bottom>
        <template v-slot:activator="{ on }">
            <v-chip draggable
                class="ma-2"
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