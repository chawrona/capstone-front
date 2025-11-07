import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        component: () => import("@/pages/HomePage.vue"),
        name: "home",
        path: "/",
    },
    {
        component: () => import("@/pages/games/game/Game.vue"),
        name: "game",
        path: "/:id/game",
    },
    {
        component: () => import("@/pages/games/ludo/Ludo.vue"),
        name: "ludo",
        path: "/:id/ludo",
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
