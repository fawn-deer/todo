<template>
    <div id="app">
        <TodoListTab />
        <router-view/>
    </div>
</template>

<script>
    import TodoListTab from "./components/TodoListTab";

    export default {
        name: "App",
        components: {TodoListTab},
    }
</script>

<style scoped>

</style>