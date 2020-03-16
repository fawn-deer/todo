const Store = require('electron-store');
const localStore = new Store({
    name: 'todoLocalStore'
});
const initData = {
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

if (localStore.size === 0) {
    localStore.store = initData
}

export default localStore