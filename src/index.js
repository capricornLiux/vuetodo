import Vue from 'vue';
import App from './app.vue';

// 使用全局样式
import './assets/styles/global.styl';

// 创建一个div标签
const root = document.createElement('div');

// 将div标签添加到body中
document.body.appendChild(root);

// 实例化的时候没有收到el, 处于'未挂载'状态, 没有关联的dom元素, 使用$mount手动挂载
new Vue({
    render: (h)=>h(App)
}).$mount(root);