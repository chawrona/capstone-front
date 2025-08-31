import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        component: () => import("@/pages/HomePage.vue"),
        name: "home",
        path: "/",
    },
    {
        component: () => import("@/pages/BrianBoru.vue"),
        name: "brianboru",
        path: "/:id/brianboru",
    },
    {
        component: () => import("@/pages/lobby/LobbyPage.vue"),
        name: "lobby",
        path: "/:id",
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
