import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import moment from 'moment'
import {ValidationObserver,ValidationProvider} from "vee-validate";
import 'vuetify/dist/vuetify.css'
import store from "./store"

Vue.config.productionTip = false

Vue.filter('shortTimeFormat', function (daraStr, pattern = 'HH:mm') {
  return moment(daraStr).format(pattern)
})
Vue.component(ValidationObserver.name,ValidationObserver)
Vue.component(ValidationProvider.name,ValidationProvider)
new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')