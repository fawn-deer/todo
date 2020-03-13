<template>
    <div>
        <q-input type="text"
                 clearable
                 clear-icon="close"
                 v-model="newTabName"
                 label="新建选项卡名称"
                 @keydown.enter="add"
                 class="new-tab-input"
        />
        <q-tabs vertical
                no-caps
                active-color="blue-3"
                active-bg-color="blue-grey-13"
                indicator-color="deep-orange-13"
        >
            <q-route-tab v-for="tab in tabs"
                         :key="tab.id"
                         :to="`/${tab.listName}`"
                         @dblclick="upd(tab.listName, tab.name)"
            >
                {{ tab.name }}
            </q-route-tab>
        </q-tabs>
    </div>
</template>

<script>
    import {mapState} from "vuex";

    export default {
        name: "TodoListTab",
        data: function () {
            return {
                newTabName: '',
                splitterModel: 100
            }
        },
        computed: {
            ...mapState({
                tabs: state => state.todo.tabs
            })
        },
        methods: {
            add() {
                let name = this.newTabName.trim();
                if (name.length > 0) {
                    this.$store.commit('addTab', {name});
                    this.newTabName = ''
                }
                this.$router.push({path: `/${this.$store.getters.lastTab}`})
            }
        },
    }
</script>

<style scoped>
    .new-tab-input {
        font-size: 20px;
    }
</style>