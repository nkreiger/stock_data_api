import Vue from "vue";
import App from "./App.vue";
import VueResource from "vue-resource";

Vue.config.productionTip = false;
Vue.use(VueResource);
/*
Vue.http.options.root = "https://api.iextrading.com/1.0";
*/
Vue.http.options.root = "http://localhost:5000";

new Vue({
  render: h => h(App)
}).$mount("#app");
