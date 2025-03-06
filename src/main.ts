import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import tooltip from "@/components/tooltip/tooltip";
import VueGtag from "vue-gtag";

const app = createApp(App);
app.directive("tooltip", tooltip);

app.use(router);
app.use(VueGtag, {
  appName: "Pixel Portfolio",
  pageTrackerScreenviewEnabled: true,
  config: { id: "G-08QDYXVLR6" },
}, router);

app.mount("#app");
