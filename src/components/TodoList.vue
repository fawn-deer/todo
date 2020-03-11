<template>
    <div>
        <div v-if="haveTab">
            <BaseInputText placeholder="请输入新的待办事项"
                           v-model="newTodoText"
                           @keydown.enter="add"
            />
            <select v-model="filterDone">
                <option v-for="option in options"
                        :key="option.value"
                        :value="option.value"
                >
                    {{option.text}}
                </option>
            </select>
            <ul>
                <TodoListItem v-for="item in lists"
                              :key="item.id"
                              :item="item"
                />
            </ul>
        </div>
    </div>
</template>

<script>
    import BaseInputText from "@/components/BaseInputText";
    import TodoListItem from "@/components/TodoListItem";

    export default {
        name: "TodoList",
        components: {TodoListItem, BaseInputText},
        props: ['tab'],
        data: function () {
            return {
                newTodoText: '',
                filterDone: 'filter',
                options: [
                    {text: '全部', value: 'all'},
                    {text: '未完成', value: false},
                    {text: '已完成', value: true},
                ]
            }
        },
        computed: {
            haveTab() {
                return this.tab in this.$store.state.todo.lists;
            },
            lists() {
                const currentTabLists = this.$store.state.todo.lists[this.tab].todo;
                if (this.filterDone === 'all') {
                    return currentTabLists;
                }
                return currentTabLists.filter(todo => {
                    return todo.done === this.filterDone
                })
            }
        },
        methods: {
            add() {
                let text = this.newTodoText.trim();
                if (text.length > 0) {
                    this.$store.commit('addTodo', {
                        listName: this.tab,
                        text
                    });
                    this.newTodoText = '';
                    this.filterDone = false
                }
            },
        },
        created: function () {
            // 触发计算lists
            this.filterDone = false;
        }
    }
</script>

<style scoped>

</style>