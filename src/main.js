// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import axios from 'axios'
// import * as axios from './Axios.js';
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)

//Notification Message
import FlashMessage from "@smartweb/vue-flash-message";
Vue.use(FlashMessage);

/* Start Configuration Bootstrap */
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
    // Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
    /* End Configuration Bootstrap */

Vue.config.productionTip = false

//GLOBAL CSS
import '@/assets/css/global.css'

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})