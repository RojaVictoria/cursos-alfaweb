import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import firebase from "./plugins/firebase"
import VueSweetalert2 from 'vue-sweetalert2';

Vue.config.productionTip = false;
export const bus = new Vue();

new Vue({
  router,
  store,
  vuetify,
  firebase,
  VueSweetalert2,
  render: (h) => h(App),
}).$mount("#app");
