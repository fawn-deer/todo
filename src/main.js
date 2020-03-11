import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import store from './store'
import TodoList from "./components/TodoList";

Vue.use(VueRouter);

const routes = [
    { path: '/', component: TodoList, props: true},
    { path: '/:tab', component: TodoList, props: true},
    { path: '*', redirect: `/`}
];

const router = new VueRouter({
    mode: 'history',
    routes
});

new Vue({
    store,
    router,
    render: h => h(App),
}).$mount('#app');
