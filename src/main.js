import { createPinia } from "pinia";
import { createApp } from "vue";

import App from "./App.vue";
import router from "./router";
import "./styles/index.scss";
import "./styles/app.scss";

const app = createApp(App);
app.use(router);
app.use(createPinia());

router.isReady().then(() => {
    app.mount("#app");
});
