import Vue from "vue";
import localStore from "../localStore";

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
            nextId: 0,
            todo: []
        },
    }
};
async function setLocalStore(type, payload) {
    if (process.env.IS_ELECTRON){
        if (type === 'all') {
            localStore.store = payload;
        }
        localStore.set(type, payload);
    }
}

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
        Vue.set(state, 'tabs', tabs);
        Vue.set(state, 'lists', lists);
        nextTabId = Math.max.apply(null, Array.from(tabs, (tab) => {
            return tab.id
        })) + 1;
    },
    addTab(state, {name}) {
        const id = nextTabId++;
        const listName = 'tab-' + id;
        state.tabs.push({
            id,
            name,
            listName
        });
        Vue.set(state.lists, listName, {
            filter: 'undone',
            nextId: 0,
            todo: []
        });
    },
    // TODO 更改为响应式更新数据
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
        const index = state.tabs.findIndex(tab => tab.listName === listName);
        Vue.set(state.tabs, index, {
            id: state.tabs[index].id,
            name: newName,
            listName: state.tabs[index].listName
        })
    },
    addTodo(state, {listName, text}) {
        const id = state.lists[listName].nextId++;
        state.lists[listName].todo.unshift({
            id,
            done: false,
            text
        });
    },
    deleteTodo(state, {listName, id}) {
        state.lists[listName].todo = state.lists[listName].todo.filter((todo) => {
            return todo.id !== id;
        });
    },
    changeTodoState(state, {listName, id}) {
        const index = state.lists[listName].todo.findIndex(todo => todo.id === id);
        Vue.set(state.lists[listName].todo, index, {
            id: state.lists[listName].todo[index].id,
            done: !state.lists[listName].todo[index].done,
            text: state.lists[listName].todo[index].text
        })
    }
};

const actions = {
    initStoreAction(context) {
        const {tabs, lists} = localStore.store;
        context.commit('init', {
            tabs,
            lists
        })
    },
    addTabAction(context, name) {
        context.commit('addTab', name);
        setLocalStore('all', context.state);
    },
    deleteTabAction(context, {listName}) {
        context.commit('deleteTab', {listName});
        setLocalStore('all', context.state);
    },
    updateTabNameAction(context, {listName, newName}) {
        context.commit('updateTabName', {listName, newName});
        setLocalStore('tabs', context.state.tabs);
    },
    addTodoAction(context, {listName, text}) {
        context.commit('addTodo', {listName, text});
        setLocalStore('lists', context.state.lists);
    },
    deleteTodoAction(context, {listName, id}) {
        context.commit('deleteTodo', {listName, id});
        setLocalStore('lists', context.state.lists);
    },
    changeTodoStateAction(context, {listName, id}) {
        context.commit('changeTodoState', {listName, id});
        setLocalStore('lists', context.state.lists);
    }

};

export default {
    namespace: true,
    state,
    getters,
    mutations,
    actions
}