import Vue from "vue";
import App from "./App.vue";
import router from "./router";

Vue.filter("currency", value => {
  if (typeof value !== "number") {
    return value;
  } else {
    return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  }
});

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
