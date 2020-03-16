<template>
    <q-item tag="label">
        <q-item-section side top>
            <q-checkbox :value="item.done"
                        @input="changeTodoStateAction({listName: tab(), id: item.id})"
            />
        </q-item-section>
        <q-item-section>
            <q-item-label>{{ item.text }}</q-item-label>
        </q-item-section>
        <q-btn round
               color="red"
               icon="clear"
               @click="deleteTodoAction({listName: tab(), id: item.id})"
        />
    </q-item>
</template>

<script>
    import {mapActions} from "vuex";

    export default {
        name: "TodoListItem",
        props: ['item'],
        methods: {
            ...mapActions([
                'deleteTodoAction',
                'changeTodoStateAction'
            ]),
            tab() {
                return this.$route.params.tab;
            }
        }
    }
</script>

<style scoped>

</style>