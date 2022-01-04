import Vue from 'vue';

import './config/vendor';
import './config/filters'
import './config/bootstrap';
import './config/vue-editor';
import './config/vue-file-agent';
import './config/vue-toasted';

import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
