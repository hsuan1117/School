import Vue from 'vue'
import App from './App.vue'
import Vuex from "vuex"
import createPersistedState from "vuex-persistedstate"
import vuetify from './plugins/vuetify'
import router from './router'
import moment from 'moment'
import {ValidationObserver,ValidationProvider} from "vee-validate";
import 'vuetify/dist/vuetify.css'


Vue.config.productionTip = false
Vue.filter('shortTimeFormat', function (daraStr, pattern = 'HH:mm') {
  return moment(daraStr).format(pattern)
})
Vue.component(ValidationObserver.name,ValidationObserver)
Vue.component(ValidationProvider.name,ValidationProvider)
Vue.use(Vuex)
// eslint-disable-next-line no-unused-vars
const store = new Vuex.Store({
  // ...
  plugins: [createPersistedState()],
});
new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')