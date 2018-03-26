import Vue from 'vue'
import VueRouter from 'vue-router'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI,{ size: 'small' });

Vue.use(VueRouter);

import App from './../view/app.vue'

import List from './../view/taskList.vue'

const routes = [
    { path: '/', component: List }
];

const router = new VueRouter({
    routes
});

new Vue({
    el:'#app',
    router,
    template: '<App/>',
    components: { App },
});
