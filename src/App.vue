<template>
    <div id="app">
        <TodoListTab v-on:change="changeTab"
                     :currentTab="currentTab"
        />
        <TodoList :currentTab="currentTab"
        />
    </div>
</template>

<script>
    import TodoListTab from "./components/TodoListTab";
    import TodoList from "./components/TodoList";

    export default {
        name: "App",
        components: {TodoList, TodoListTab},
        data: function () {
            return {
                currentTab: this.$store.state.todo.tabs[0].listName
            }
        },
        methods: {
            changeTab(listName) {
                this.currentTab = listName
            }
        }
    }
</script>

<style scoped>

</style>