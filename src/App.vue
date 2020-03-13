<template>
    <div id="app">
        <q-layout view="lHh LpR lFf">

            <q-header reveal elevated class="bg-blue-grey-13 text-white header">
                <q-toolbar>
                    <q-btn dense flat round icon="menu" @click="left = !left"/>

                    <q-toolbar-title>
                        {{ title }}
                        <q-tooltip>
                            点击修改选项卡名称
                        </q-tooltip>
                        <q-popup-edit v-model="title"
                                      self="bottom left"
                                      touch-position
                        >
                            <q-input v-model="title" dense autofocus counter/>
                        </q-popup-edit>
                    </q-toolbar-title>
                </q-toolbar>
            </q-header>

            <q-drawer show-if-above v-model="left" side="left" bordered>
                <TodoListTab/>
            </q-drawer>

            <q-page-container>
                <router-view/>
            </q-page-container>

        </q-layout>
    </div>
</template>

<script>
    import TodoListTab from "./components/TodoListTab";

    export default {
        name: "App",
        components: {TodoListTab},
        data() {
            return {
                left: false
            }
        },
        computed: {
            title: {
                get: function () {
                    return this.$route.params.tab
                        ? this.tabName()
                        : "请选择选项卡"
                },
                set: function (newName) {
                    newName = newName.trim();
                    if (newName.length > 0) {
                        const listName = this.$route.params.tab;
                        this.$store.commit('updateTabName', {listName, newName});
                    }
                }
            }
        },
        methods: {
            tabName() {
                const tab = this.$store.getters.getTab(this.$route.params.tab);
                return tab.length >= 1
                    ? tab[0].name
                    : "选项卡不存在"
            }
        }
    }
</script>

<style scoped>
    .header {
        height: 56px;
        line-height: 56px;
    }
</style>