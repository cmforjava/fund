import Vue from 'vue'
import App from './App'
import mgfun from '@/mixins/mgfun.js'
Vue.mixin(mgfun);
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
