<template>
    <div id="app">
        <q-layout view="lHh LpR lFf">

            <q-header elevated class="bg-blue-grey-13 text-white">
                <q-bar class="q-electron-drag" v-if="isElectron">
                    <div>Todo</div>

                    <q-space/>

                    <q-btn dense flat icon="minimize" @click="minimize()"/>
                    <q-btn dense flat icon="crop_square" @click="maximize()"/>
                    <q-btn dense flat icon="close" @click="closeApp()"/>
                </q-bar>
                <q-toolbar reveal>
                    <q-btn dense flat round icon="menu" @click="left = !left"/>
                    <q-space/>
                    <q-toolbar-title class="inline-block text-center">
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
                    <q-space/>
                </q-toolbar>
            </q-header>

            <q-drawer show-if-above v-model="left" side="left" bordered>
                <q-scroll-area class="fit">
                    <TodoListTab/>
                </q-scroll-area>
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
                left: false,
                isElectron: this.$q.platform.is.electron,
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
                        this.$store.dispatch('updateTabNameAction', {listName, newName});
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
            },
            minimize() {
                if (this.isElectron) {
                    const {remote} = require('electron');
                    remote.BrowserWindow.getFocusedWindow().minimize();
                }
            },

            maximize() {
                if (this.isElectron) {
                    const {remote} = require('electron');
                    const win = remote.BrowserWindow.getFocusedWindow();
                    win.isMaximized()
                        ? win.unmaximize()
                        : win.maximize()
                }
            },

            closeApp() {
                if (this.isElectron) {
                    const {remote} = require('electron');
                    remote.BrowserWindow.getFocusedWindow().close();
                }
            }
        },
        created: function () {
            if (process.env.IS_ELECTRON) {
                this.$store.dispatch('initStoreAction');
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