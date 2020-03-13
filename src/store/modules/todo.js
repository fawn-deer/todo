let nextTabId = 1;
const state = {
    tabs: [
        {
            id: 0,
            name: '待办事项',
            listName: 'tab-0'
        }
    ],
    lists: {
        'tab-0': {
            filter: 'undone',
            nextId: 5,
            todo: [
                {
                    id: 0,
                    done: false,
                    text: '1sdf'
                }, {
                    id: 2,
                    done: false,
                    text: 'sdf'
                }, {
                    id: 3,
                    done: false,
                    text: '1aesr'
                }, {
                    id: 4,
                    done: false,
                    text: 'vcxcv'
                },
            ]
        },
    }
};

const getters = {
    lastTab: state => {
        return state.tabs.slice(-1)[0].listName;
    },
    tabs: state => {
        return state.tabs
    },
    getTab: state => listName => {
        return state.tabs.filter(tab => {
                return tab.listName === listName
            })
    }
};

const mutations = {
    init(state, {tabs, lists}) {
        state.tabs = tabs;
        state.lists = lists;
        nextTabId = Math.max.apply(null, Array.from(tabs, (tab) => {
            return tab.id
        })) + 1;
    },
    addTab(state, {name}) {
        let id = nextTabId++;
        let listName = 'tab-' + id;
        state.tabs.push({
            id,
            name,
            listName
        });

        let lists = state.lists;
        lists[listName] = {
            filter: 'undone',
            nextId: 0,
            todo: []
        };
        state.lists = lists;
    },
    deleteTab(state, {listName}) {
        let lists = state.lists;

        state.tabs = state.tabs.filter((tab) => {
            return tab.listName !== listName
        });
        if (listName in lists) {
            delete lists[listName];
            state.lists = lists;
        }
    },
    updateTabName(state, {listName, newName}) {
        let tabs = state.tabs;
        let index = tabs.findIndex(tab => tab.listName === listName);
        tabs[index].name = newName;
        state.tabs = tabs;
    },
    addTodo(state, {listName, text}) {
        let lists = state.lists;
        let list = lists[listName];

        let id = list.nextId++;
        list.todo.push({
            id,
            done: false,
            text
        });

        lists[listName] = list;
        state.lists = lists;
    },
    deleteTodo(state, {listName, id}) {
        let lists = state.lists;
        let list = lists[listName];

        list.todo = list.todo.filter((todo) => {
            return todo.id !== id;
        });
        lists[listName] = list;
        state.lists = lists;
    },
    changeTodoState(state, {listName, id}) {
        let lists = state.lists;
        let list = lists[listName];

        let index = list.todo.findIndex(todo => todo.id === id);
        list.todo[index].done = !list.todo[index].done;

        lists[listName] = list;
        state.lists = lists;
    }
};

export default {
    namespace: true,
    state,
    getters,
    mutations
}