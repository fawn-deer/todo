<template>
    <li>
        <input v-if="!item.done"
               type="checkbox"
               :checked="item.done"
               @change="setTodoDone({listName: tab(), id: item.id})"
        />
        {{ item.text }}
        <button @click="deleteTodo({listName: tab(), id: item.id})">X</button>
    </li>
</template>

<script>
    import {mapMutations} from "vuex";

    export default {
        name: "TodoListItem",
        props: ['item'],
        methods: {
            ...mapMutations([
                'deleteTodo',
                'setTodoDone'
            ]),
            tab() {
                return this.$route.params.tab;
            }
        }
    }
</script>

<style scoped>

</style>