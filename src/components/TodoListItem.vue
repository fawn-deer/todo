<template>
    <li>
        <input v-if="!item.done"
               type="checkbox"
               :checked="item.done"
               @change="setTodoDone({listName, id: item.id})"
        />
        {{ item.text }}
        <button @click="deleteTodo({listName, id: item.id})">X</button>
    </li>
</template>

<script>
    import {mapMutations} from "vuex";

    export default {
        name: "TodoListItem",
        props: ['item', 'listName'],
        methods: {
            ...mapMutations([
                'deleteTodo',
                'setTodoDone'
            ])
        }
    }
</script>

<style scoped>

</style>