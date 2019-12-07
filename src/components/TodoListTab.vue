<template>
    <div>
        <BaseInputText placeholder="请输入新建 tab 名称"
                       v-model="newTabName"
                       @keydown.enter="add"
        />
        <div v-for="tab in tabs"
             :key="tab.id"
             :listName="tab.listName"
             :class="{active: tab.listName === currentTab}"
        >
            <span @click="$emit('change', tab.listName)"
                  @dblclick="upd(tab.listName, tab.name)"
            >
                {{ tab.name }}
            </span>
            <button v-if="tabs.length > 1"
                    @click="del(tab.listName, tab.name)"
            >
                X
            </button>
        </div>
    </div>
</template>

<script>
    import {mapState} from "vuex";
    import BaseInputText from "@/components/BaseInputText";

    export default {
        name: "TodoListTab",
        data: function () {
            return {
                newTabName: ''
            }
        },
        props: ['currentTab'],
        components: {BaseInputText},
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
            },
            upd(listName, name) {
                let newName = window.prompt('请输入tab: ' + name + ' 的新名称').trim();
                if (newName.length > 0) {
                    this.$store.commit('updateTabName', {listName, newName});
                }
            },
            del(listName, name) {
                if (window.confirm('是否要删除tab: "' + name + '" 以及下属条目')) {
                    this.$store.commit('deleteTab', {listName});
                }
            }
        },
    }
</script>

<style scoped>
    .active{
        background: lightsteelblue;
    }
</style>