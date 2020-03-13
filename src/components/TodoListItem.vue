<template>
    <q-item tag="label">
        <q-item-section side top>
            <q-checkbox :value="item.done"
                        @input="changeTodoState({listName: tab(), id: item.id})"
            />
        </q-item-section>
        <q-item-section>
            <q-item-label>{{ item.text }}</q-item-label>
        </q-item-section>
        <q-btn round
               color="red"
               icon="clear"
               @click="deleteTodo({listName: tab(), id: item.id})"
        />
    </q-item>
</template>

<script>
    import {mapMutations} from "vuex";

    export default {
        name: "TodoListItem",
        props: ['item'],
        methods: {
            ...mapMutations([
                'deleteTodo',
                'changeTodoState'
            ]),
            tab() {
                return this.$route.params.tab;
            }
        }
    }
</script>

<style scoped>

</style>