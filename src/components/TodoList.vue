<template>
    <div class="container">
        <div v-if="haveTab">
            <q-input type="text"
                     clearable
                     clear-icon="close"
                     v-model="newTodoText"
                     label="新的待办事项"
                     @keydown.enter="add"
                     class="new-todo-input"
            />
            <q-select v-model="filterDone"
                      :options="options"
                      :display-value="`${filterDone.text}`"
                      class="select-todo"
            >
                <template v-slot:option="scope">
                    <q-item v-on="scope.itemEvents"
                            v-bind="scope.itemProps"
                    >
                        <q-item-label v-html="scope.opt.text"/>
                    </q-item>
                </template>
            </q-select>
        </div>
        <q-list>
            <TodoListItem v-for="item in lists"
                          :key="item.id"
                          :item="item"
            />
        </q-list>
    </div>
</template>

<script>
    import TodoListItem from "@/components/TodoListItem";

    export default {
        name: "TodoList",
        components: {TodoListItem},
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
                if (this.haveTab) {
                    const currentTabLists = this.$store.state.todo.lists[this.tab].todo;
                    if (this.filterDone.value === 'all') {
                        return currentTabLists;
                    }
                    return currentTabLists.filter(todo => {
                        return todo.done === this.filterDone.value
                    })
                }
                return []
            }
        },
        methods: {
            add() {
                let text = this.newTodoText.trim();
                if (text.length > 0) {
                    this.$store.dispatch('addTodoAction', {
                        listName: this.tab,
                        text
                    });
                    this.newTodoText = '';
                    this.filterDone = {text: '未完成', value: false}
                }
            },
        },
        created: function () {
            // 触发计算lists
            this.filterDone = {text: '未完成', value: false};
        }
    }
</script>

<style scoped>
    .new-todo-input {
        font-size: 20px;
        width: 80%;
        float: left;
    }

    .select-todo {
        width: 20%;
        float: left;
    }

    .container {
        width: 80%;
        margin: 10px auto;
    }
</style>