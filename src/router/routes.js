import TodoList from "../components/TodoList";

const routes = [
    { path: '/', component: TodoList, props: true},
    { path: '/:tab', component: TodoList, props: true},
    { path: '*', redirect: '/'}
];

export default routes